const app = require("./app");

app.listen(process.env.PORT, () => {
	`Server is running on port ${process.env.PORT}`;
});
