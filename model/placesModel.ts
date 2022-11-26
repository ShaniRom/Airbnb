import mongoose from "mongoose";

const PlacesSchema = new mongoose.Schema({
  id: String,
  accommodates: String,
  address: String,
  address_country: String,
  address_country_code: String,
  name: String,
  amenities: [String],
  bedrooms: String,
  beds: String,
  number_of_reviews: String,
  price: String,
  cancel: String,
  bathrooms: String,
  images: String,
  host: String,
  host_about: String,
  host_name: String,
  host_picture_url: String,
  description: String,
  bed_type: String,
  reviews_rating: String,
  daysAvailable: String,
});

 const Places = mongoose.model("airbnboptions", PlacesSchema);


export default Places;
