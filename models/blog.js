import mongoose from "mongoose";
const { Schema, model } = mongoose;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  dop: {
    type: Date,
    default: Date.now,
  },
  timetoread: {
    type: String,
  },
});

blogSchema.pre("save", function () {
  const content = this.content;
  let word_cnt = 0;
  for (let i = 0; i < content.length; i++) {
    if (content[i] === " ") word_cnt += 1;
  }
  let time = word_cnt / 200;
  let mins = Math.floor(time);
  let sec = Math.floor((time - mins) * 60);
  this.timetoread = `${mins} min, ${sec} sec`;
});

const blogModel = model("Blog", blogSchema);
export default blogModel;
