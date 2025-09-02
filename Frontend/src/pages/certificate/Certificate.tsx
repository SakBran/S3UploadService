import { Button } from 'antd';
import './Certificate.css';

const Certificate = () => {
  return (
    <>
      <head>
        <title>Certificate of Appreciation</title>
      </head>

      <body>
        <div className="certificate">
          <div className="header">
            <h1>Certificate of Appreciation</h1>
            <h2>Presented by the Ministry of Hotels and Tourism</h2>
            <img
              src="https://upload.wikimedia.org/wikipedia/en/thumb/4/4d/Logo_of_the_Ministry_of_Hotels_%26_Tourism_%28Burma%29.svg/250px-Logo_of_the_Ministry_of_Hotels_%26_Tourism_%28Burma%29.svg.png"
              alt="Ministry Logo"
              className="logo"
            />
          </div>

          <div className="body-content">
            This is to proudly acknowledge
            <div className="recipient-name">Golden Rose Villa & Spa</div>
            for their exceptional commitment to hospitality and their
            significant contribution to promoting tourism excellence in the
            region.
          </div>

          <div className="footer">
            <div className="footer-block">
              <img
                height="80"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/JohnHancocksSignature.svg/330px-JohnHancocksSignature.svg.png"
                alt="Signature"
              />
              <div className="signature-line"></div>
              <div className="signature-name">Director General</div>
            </div>

            <div className="footer-block">
              <img
                height="80"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/State_seal_of_Burma_%281948-1974%29.png/1242px-State_seal_of_Burma_%281948-1974%29.png"
                alt="Seal"
              />
              <div className="signature-line"></div>
              <div className="seal">Official Seal</div>
            </div>

            <div className="footer-block qr-code">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?data=https://tourism.gov.mm/certificate/123456&size=100x100"
                alt="QR Code"
              />
              <div className="qr-label">Scan to Verify</div>
            </div>
          </div>
        </div>
        <div className="control">
          <Button
            onClick={() => {
              window.history.back();
            }}
            style={{ marginRight: '1rem' }}
          >
            Back
          </Button>
          <Button
            onClick={() => {
              window.print();
            }}
            type="primary"
          >
            Print
          </Button>
        </div>
      </body>
    </>
  );
};

export default Certificate;
