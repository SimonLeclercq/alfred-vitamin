"use strict";
require("dotenv").config();
const alfy = require("alfy");

const query = `https://api.airtable.com/v0/appsbKAJaRpAvx3Jb/Pages?fields%5B%5D=Name&fields%5B%5D=DocumentationURL&filterByFormula=REGEX_MATCH(%7BName%7D%2C%22(%3Fi)(${alfy.input})%22)&maxRecords=10`;

(async () => {
	const data = await alfy.fetch(query, {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
		},
	});

	const result = data.records.map((element) => ({
		title: element.fields["Name"],
		arg: element.fields["DocumentationURL"],
	}));

	alfy.output(result);
})();
