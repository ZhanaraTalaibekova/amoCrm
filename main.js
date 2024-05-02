const { default: axios } = require("axios");

const link = 'https://technical1.amocrm.ru/oauth2/access_token';
async function authorization() {
  const tokens = await axios.post(
    link,
    {
      client_id: "b7e3b990-c4e8-4396-87c3-ff0748b16134",
      client_secret: "ulqdSkSXOws0JBhNkajWmif3aEw6EEBsoqIZQAeq7BDOgoK4IuO5W615wtj45dx1",
      grant_type: "authorization_code",
      code: "def502006eb105ad01bb1dfb60b1e4cd22139fa2aa4dd3269e4f5104875212ef40c475eac94b86f529b156b19edaacb7d6876ecb06c757c1f7cf8aad6feb7c43a048719ee7f7e1987d3d2ef86a8fbc5f3d00858138b0730dd72226a4aa5b7a778554d22ce4ae8ba517883d90ea011a8f679ba3cd08e8d5601d4bb4d7229c56d260c6edf99f097d64625d94c808b0840ca96c5a240b92065e64510d0934a3a48e660437d0f3452be5eaa2e74e205c98aae54ea4ff6f05dedd0c3525b2ddc5643c0adf22f9247676229a32f3b1c53f6d6c6c575aeb96171e30c6f60b3b7d37afe76bd10f5f84100c7e2d2b586aefdc11218c3401821d63675c296e43bb3f1c866e17c7f3128687de24c98e20b5d73d2705f90b92e9e1884ffdd63c99d43c0b61f8476074f5ac9fd8b02a671143014e9cff489c4cca2b000d8ab5b5902e3866d03442fdcef2bd842542f9863f06d590574ea7dd987bba73b263fa125fb725fc498c22eedf9e0dfffdc16f96407137bc4886bb6e64282fe2cfb061c50f0a8846b6b069db5523c1c30c38d8a8b2eee36c3ba51b1ea0aba7c46159809065046ac063a8461d2bda51dabbc28b08dd33f4de808ee9780ff5131c3d79648a9b57a4852d3cc526d38957f7cdb75d075e0982096ce7c6148b68b97bc6aa06712a4f7569c4dfca957669",
      redirect_uri: "https://example.com"
    }).then((request) => {
      return request.data;
    });
}

async function getLeadsById() {
  const link = `https://technical1.amocrm.ru/api/v4/leads/38486255`;
  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY5ZjcyNWEwNmZkMzU5MWM1MmVhYTVkNWQ0YzM5OTMyYWQ0M2QwYzMxYTY3ZDBmN2Q2ZWM5ZDdiOWQwMzdiMTQwZjRkMjg2MWYyN2QzYzU1In0.eyJhdWQiOiJiN2UzYjk5MC1jNGU4LTQzOTYtODdjMy1mZjA3NDhiMTYxMzQiLCJqdGkiOiI2OWY3MjVhMDZmZDM1OTFjNTJlYWE1ZDVkNGMzOTkzMmFkNDNkMGMzMWE2N2QwZjdkNmVjOWQ3YjlkMDM3YjE0MGY0ZDI4NjFmMjdkM2M1NSIsImlhdCI6MTcxNDQ3OTM4MiwibmJmIjoxNzE0NDc5MzgyLCJleHAiOjE3MTUxMjY0MDAsInN1YiI6IjEwMzczNDE0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxMjQ5MjM0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZDFkODU1ZjEtYjZjMi00NDNjLWJiOTMtZDdkMWFjYzYzNGJjIn0.aWFFBJ_D6AtR7g4luFu47uipHn27JHz1sTYyLMyPxJn8y9HU_Oe_bWPT9Gf_zXX5t9oBGgbs8-2dMHuJ0a6W_hE_K86L_1hsJi41JwwX6T3zJOlCnHcVAU1SvGDsSwbgwylR-nvqMVu0Ahzk5snQW_7GUjXyEkI90Cp0Pm-65L5BHafmsjVpUU-H1DtFJvBTgKJ380ir1Uz8q7ZCG7L11u5qiDZVsEn2-S6q6DZ-McpLOH_JHKAfWdVBweW1VNvX088D_WIx7wdEl5_gaGUmPRWw-XwN2DAHEMC97uTH4Fs2GEnOTnDGK3B3yYmwb1P14QK8MiI7k8NbV2mJg_L_rA';
  try {
    const response = await axios.get(link, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      }
    });

    const {
      id,
      name,
      price,
      responsible_user_id,
      group_id,
      status_id,
      pipeline_id,
      created_by,
      updated_by,
      created_at,
      updated_at,
      closed_at,
      closest_task_at,
      is_deleted,
      score,
      account_id,
      labor_cost,
      is_price_computed,
      _links
    } = response.data;

    const leadData = {
      id,
      name,
      price,
      responsible_user_id,
      group_id,
      status_id,
      pipeline_id,
      created_by,
      updated_by,
      created_at,
      updated_at,
      closed_at,
      closest_task_at,
      is_deleted,
      score,
      account_id,
      labor_cost,
      is_price_computed,
      _links
    };

    return leadData;
  } catch (e) {
    console.log('error = ', e);
  }
}


async function createLeads() {
  const link = `https://technical1.amocrm.ru/api/v4/leads`;
  const accessToken = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjY5ZjcyNWEwNmZkMzU5MWM1MmVhYTVkNWQ0YzM5OTMyYWQ0M2QwYzMxYTY3ZDBmN2Q2ZWM5ZDdiOWQwMzdiMTQwZjRkMjg2MWYyN2QzYzU1In0.eyJhdWQiOiJiN2UzYjk5MC1jNGU4LTQzOTYtODdjMy1mZjA3NDhiMTYxMzQiLCJqdGkiOiI2OWY3MjVhMDZmZDM1OTFjNTJlYWE1ZDVkNGMzOTkzMmFkNDNkMGMzMWE2N2QwZjdkNmVjOWQ3YjlkMDM3YjE0MGY0ZDI4NjFmMjdkM2M1NSIsImlhdCI6MTcxNDQ3OTM4MiwibmJmIjoxNzE0NDc5MzgyLCJleHAiOjE3MTUxMjY0MDAsInN1YiI6IjEwMzczNDE0IiwiZ3JhbnRfdHlwZSI6IiIsImFjY291bnRfaWQiOjMxMjQ5MjM0LCJiYXNlX2RvbWFpbiI6ImFtb2NybS5ydSIsInZlcnNpb24iOjIsInNjb3BlcyI6WyJjcm0iLCJmaWxlcyIsImZpbGVzX2RlbGV0ZSIsIm5vdGlmaWNhdGlvbnMiLCJwdXNoX25vdGlmaWNhdGlvbnMiXSwiaGFzaF91dWlkIjoiZDFkODU1ZjEtYjZjMi00NDNjLWJiOTMtZDdkMWFjYzYzNGJjIn0.aWFFBJ_D6AtR7g4luFu47uipHn27JHz1sTYyLMyPxJn8y9HU_Oe_bWPT9Gf_zXX5t9oBGgbs8-2dMHuJ0a6W_hE_K86L_1hsJi41JwwX6T3zJOlCnHcVAU1SvGDsSwbgwylR-nvqMVu0Ahzk5snQW_7GUjXyEkI90Cp0Pm-65L5BHafmsjVpUU-H1DtFJvBTgKJ380ir1Uz8q7ZCG7L11u5qiDZVsEn2-S6q6DZ-McpLOH_JHKAfWdVBweW1VNvX088D_WIx7wdEl5_gaGUmPRWw-XwN2DAHEMC97uTH4Fs2GEnOTnDGK3B3yYmwb1P14QK8MiI7k8NbV2mJg_L_rA';
  const leadId = await getLeadsById();
  console.log(leadId);

  try {
    const tokens = await axios.post(
      link, [leadId], {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      }
    })
    console.log('tokens = ', tokens);
  } catch (e) {
    console.log('error = ', e);
  }
}
createLeads();