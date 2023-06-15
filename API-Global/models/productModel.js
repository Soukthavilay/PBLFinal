const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    amount:{
      type: Number,
      required: true,
    },
    band:{
      type: String,
      required: true,
    },
    types: {
      type: Array,
      require: true,
      default: []
    },
    description: {
      type: String,
      required: true,
    },
    discountPercentage:{
      type: Number
    },
    discountExpiration: {
      type:Date,
    },
    updatedPrice:{
      type:Number,
    },
    feature:{
      color:{
        type: String,
      },
      typeOf:{
        type: String,
      },
      SSDStorage:{
        type: String,
      },
      processor:{
        type: String,
      },
      graphicSeries:{
        type: String,
      },
      operatingSystem:{
        type: String,
      },
      keyboardLanguage:{
        type: String,
      },
      hardDiscType:{
        type: String,
      },
      ram:{
        type: String,
      },
      inches:{
        type:String,
      },
      storage:{
        type:String,
      },
      batteries:{
        type:String,
      },
      connectivities:{
        type:String,
      },
      sim:{
        type:String,
      }
    },
    images: {
      type: Object,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    sold: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true, //important
  }
);

module.exports = mongoose.model("Products", productSchema);
