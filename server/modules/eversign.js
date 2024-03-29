const dotenv = require('dotenv');
const axios = require('axios')
dotenv.config();


const sendSignRequest = async (data) => {
	let templates = (await axios.get(`https://api.eversign.com/api/document?access_key=${process.env.EVERSIGN_ACCESS_KEY}&business_id=${process.env.EVERSIGN_BUSINESS_ID}&type=templates`)).data

	let doc = await axios.post(`
		https://api.eversign.com/api/document?access_key=${process.env.EVERSIGN_ACCESS_KEY}&business_id=${process.env.EVERSIGN_BUSINESS_ID} `, {
			"sandbox": 0,
			"template_id": templates[0].document_hash,
			"custom_requester_name": "",
			"custom_requester_email": "",
			"redirect": "https://beta.fanfare.fm",
			"redirect_decline": "https://beta.fanfare.fm",
			"client": "",
			"expires": "",
			"embedded_signing_enabled": 0,
			"signers": [{
				"role": "Artist",
				"name": data.name,
				"email": data.email,
				"pin": "",
				"message": "Please sign",
				"deliver_email": "",
				"language": "en"
			}, {
				"role": "Company",
				"name": "Jackson Felty",
				"email": "info@fanfare.team",
				"pin": "",
				"message": "",
				"deliver_email": "",
				"language": "en"
			}], // people who must sign the document
			"recipients": [{
				"role": "Company",
				"name": "Jackson Felty",
				"email": "info@fanfare.team",
				"language": "en"
			}] // people who are CCed with the finished document
	})
	return 
}

module.exports = sendSignRequest

// sendSignRequest({name: "Tyler", email: "tysehr37@gmail.com"})