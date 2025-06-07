// Backend: Flask server (app.py)
from flask import Flask, request, jsonify
from flask_cors import CORS
import random

app = Flask(__name__)
CORS(app)

# Sample mock data to simulate scraped results
sample_contacts = [
    {
        "company": "Synopsys",
        "title": "Digital Design Internship",
        "contact_name": "Anita Sharma",
        "contact_email": "anita.sharma@synopsys.com",
    },
    {
        "company": "Intel",
        "title": "SoC Verification Engineer",
        "contact_name": "Raj Mehta",
        "contact_email": "raj.mehta@intel.com",
    },
    {
        "company": "Qualcomm",
        "title": "Embedded Systems Developer",
        "contact_name": "Priya Nair",
        "contact_email": "priya.nair@qualcomm.com",
    }
]

def generate_email_template(name, company, title):
    return f"""Hi {name},\n\nI hope this message finds you well. I came across your profile while researching {company} and was impressed by the impactful work being done in the {title} domain.\n\nI'm a passionate engineering student focusing on VLSI and SoC, and I'm currently seeking an opportunity to contribute and grow through a {title.lower()}.\n\nI'd love to connect and learn more about potential opportunities and how I might add value to your team.\n\nLooking forward to hearing from you!\n\nWarm regards,\nPranav Ratish"""

@app.route("/search", methods=["POST"])
def search():
    data = request.get_json()
    domain = data.get("domain")
    location = data.get("location")
    job_type = data.get("type")

    # Simulate filtering (could be extended with real scraping)
    selected = random.sample(sample_contacts, k=3)
    for contact in selected:
        contact["email_template"] = generate_email_template(
            contact["contact_name"], contact["company"], contact["title"]
        )

    return jsonify(selected)

if __name__ == "__main__":
    app.run(debug=True)
