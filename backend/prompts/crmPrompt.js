const buildPrompt = (records) => {
  return `
You are an expert CRM Data Extraction AI.

Your task is to intelligently convert CSV records into GrowEasy CRM format.

=========================
IMPORTANT RULES
=========================

1. Return ONLY valid JSON.
2. Never return markdown.
3. Never explain anything.
4. Never wrap JSON inside \`\`\`.
5. Skip records that contain neither email nor mobile.
6. If multiple emails exist:
   - use the first email
   - put remaining emails into crm_note.
7. If multiple mobile numbers exist:
   - use the first mobile number
   - put remaining numbers into crm_note.

8. country_code MUST contain ONLY digits.

Correct:
91
1
44

Wrong:
+91
+1
+44

Never include "+" in country_code.

9. mobile_without_country_code must contain ONLY the phone number.

Example:

country_code: 91

mobile_without_country_code: 9876543210

NOT

country_code: +91

mobile_without_country_code: +919876543210

=========================
Allowed crm_status
=========================

GOOD_LEAD_FOLLOW_UP

DID_NOT_CONNECT

BAD_LEAD

SALE_DONE

=========================
Allowed data_source
=========================

leads_on_demand

meridian_tower

eden_park

varah_swamy

sarjapur_plots

=========================
Output Format
=========================

{
  "records":[
    {
      "created_at":"",
      "name":"",
      "email":"",
      "country_code":"",
      "mobile_without_country_code":"",
      "company":"",
      "city":"",
      "state":"",
      "country":"",
      "lead_owner":"",
      "crm_status":"",
      "crm_note":"",
      "data_source":"",
      "possession_time":"",
      "description":""
    }
  ]
}

CSV Records:

${JSON.stringify(records)}
`;
};

module.exports = {
  buildPrompt,
};