const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./modules/listing.js"); // ✅ Corrected path
const path=require("path");
const methodOverride = require("method-override");
const ejsMate = require('ejs-mate');
const wrapAsync = require('./utils/wrapAsync');
const ExpressError = require('./utils/ExpressError.js');
const { listingSchema } = require("./schema.js");





const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";

main()
  .then(() => {
    console.log("✅ Connected to DB");
  })
  .catch((err) => {
    console.log("❌ DB connection error:", err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);
app.use(express.static(path.join(__dirname, "/public")));





// Root route
app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

// middleware joi: to handle server side for validation
const validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    const msg = error.details.map(el => el.message).join(", ");
    throw new ExpressError(400, msg);
  }
  next();
};

//index route: show all the details
app.get("/listings", wrapAsync(async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
  console.log("hello");
}));

//new route: to add new hotels, flat etc..
app.get("/listings/new", (req, res) => {
  res.render("listings/new.ejs");
});

//show route: show details of a specific id 
app.get("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs", { listing });
}));

//create route: submit the form, save & redirect
app.post(
  "/listings",
  validateListing,
  wrapAsync (async(req, res, next) => {
    const newlisting = new Listing(req.body.listing);
    await newlisting.save();
    res.redirect("/listings");
  })
);


//edit route: render edit form
app.get("/listings/:id/edit", wrapAsync(async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/edit.ejs", { listing });
}));

//update route
app.put("/listings/:id",
  validateListing,
   wrapAsync(async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  res.redirect(`/listings/${id}`);
}));


//delete route
app.delete("/listings/:id", wrapAsync(async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");
}));


// Test route to create a sample listing
// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute, Goa",
//     country: "India",
//   });

//   await sampleListing.save();
//   console.log("✅ Sample listing saved");
//   res.send("✅ Successful testing");
// });


// Expresserror handlings middleware
// Catch-all for unmatched routes
// Catch-all for undefined routes
app.all(/.*/, (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

// Centralized error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500; // default to 500
  err.message = err.message || "Something went wrong!";
  res.status(statusCode).render("error.ejs", { err });
  // res.status(statusCode).send(err.message);
});


// Start server
app.listen(3000, () => {
  console.log("🚀 Server is listening on port 3000");
});