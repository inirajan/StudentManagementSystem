import { v2 as cloudinary } from "cloudinary";

const CLOUDINARY_FOLDER = "school_assignments";

const uploadFile = async (files) => {
  const fileArray = Array.isArray(files ? files : [files]);
  const uploadedFiles = [];

  for (const file of fileArray) {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream(
          {
            folder: CLOUDINARY_FOLDER,
            resource_type: "auto",
          },
          (error, data) => {
            if (error) return reject(error);

            resolve(data);
          }
        )
        .end(file.buffer);
    });

    uploadedFiles.push(result);
  }

  return uploadedFiles;
};

export default uploadFile;
