interface Props {
  name: string;
  email: string;
  tel_number: string;
  message: string;
}

export const EmailContactPage = ({
  name,
  email,
  tel_number,
  message,
}: Props) => {
  return `
          <html>
          <head>
            <title>Email Template</title>
            <style>
              /* Inline CSS for styling */
              /* ... (existing styles) */
              .main {
                background-color: #ffffff;
                font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
                font-size:18px;
              }
              .container {
                margin: 0 auto;
                padding: 20px 0 48px;
                width: 580px;
              }
              .image_container {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center; /* Center vertically */
                margin-bottom: 20px; /* Add margin-bottom to create space */
                
              }
              .container_quoute{
                padding:16px;
                background-color: #F2F3F3;
                font-size:18px;
                font-weight:200;
                border-radius:6px;
              }
              .email_logo {
                width: 200px;
                display: block;
                margin: 0 auto; /* Center horizontally */
              }
              .email_image {
                display: block;
                margin: 0 auto;
                max-width: 100%;
                margin-bottom: 20px;
                border-radius: 16px;
              }
              .questions {
                border-top: 1px solid #CCCCCC;
                display: grid;
                grid-template-columns: 1fr; /* Ensure a single column */
                gap: 10px;
                margin-top: 20px;
                width: 100%;
              }
              .questions_title {
                font-weight: 700;
                font-size: 18px;
              }
              .questions_q {
                color: gray;
                margin: 0;
               
              }
              
            </style>
          </head>
          <body>
            <div class="main">
              <div class="container">
                <p class="container_quoute">
                Zákazník Vám poslal správu s týmito údajmi
                </p>
                <div class="questions">
                  <p class="questions_q">Meno a priezvisko: ${name}</p>
                  <p class="questions_q">Email: ${email}</p>
                  <p class="questions_q">Telefónny kontakt: ${tel_number}</p>
                  <p class="questions_q">Správa: ${message}</p>
  
                </div>
              
              </div>
            </div>
          </body>
        </html>
        
          `;
};
