export const getFileInfo = (uri: any) => {
  const fileName = uri.split("/").pop();
  const extension = fileName.split(".").pop().toLowerCase();
  let type;
  switch (extension) {
    case "jpg":
    case "jpeg":
      type = "image/jpeg";
      break;
    case "png":
      type = "image/png";
      break;
    case "gif":
      type = "image/gif";
      break;
    default:
      type = "application/octet-stream";
  }
  return { fileName, type };
};
