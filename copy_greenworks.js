const fse = require("fs-extra");

/* This command makes the greenworks files available for the build. */

try {
  fse.copySync("./greenworks", "./public/lib");
  console.log("Successfully copied Greenworks files");
} catch (err) {
  console.error("Greenworks files could not be copied");
  console.error(err);
}
