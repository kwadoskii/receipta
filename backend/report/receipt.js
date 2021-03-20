module.exports = (org, receipt) => {
  const today = new Date();

  const items = receipt.items.reduce(
    (htmlStr, item, i) =>
      htmlStr +
      `
      <tr>
        <td scope="row" class="text-right">${i + 1}</td>
        <td>${item.name}</td>
        <td class="text-right">${item.unitCost}</td>
        <td class="text-right">${item.quantity}</td>
        <td class="text-right">${item.unitCost * item.quantity}</td>
      </tr>`,
    ""
  );

  const totalAmount = receipt.items.reduce(
    (acc, item) => acc + item.unitCost * item.quantity,
    0
  );

  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>Receipt</title>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"
          integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2"
          crossorigin="anonymous"
        />
      </head>
      <style>
        .logo {
          width: 100%;
          height: 100%;
          background: url("https://logodownload.org/wp-content/uploads/2014/04/bmw-logo-1.png");
          background-size: contain;
          background-repeat: no-repeat;
        }
        .print__date {
          position: absolute;
          top: 10px;
          font-size: 14px;
        }
      </style>

      <body style="font-family: -apple-system,BlinkMacSystemFont,&quot;Segoe UI&quot;,Roboto,&quot;Helvetica Neue&quot;,Arial,&quot;Noto Sans&quot;,sans-serif,&quot;Apple Color Emoji&quot;,&quot;Segoe UI Emoji&quot;,&quot;Segoe UI Symbol&quot;,&quot;Noto Color Emoji&quot;;">
        <div class="container p-4">
          <header>
            <h2 class="text-center mb-5">PURCHASE RECEIPT</h2>
            <p class="print__date">Printed on ${today.getDate()}-${
    today.getMonth() + 1
  }-${today.getFullYear()}</p>
            <div class="row">
              <div class="col-md-2">
                <div class="logo"></div>
              </div>
              <div class="col-md-7 mx-auto">
                <h5 class="my-2">${org.name}</h5>
                <p class="my-0 small">${org.address.line1},</p>
                <p class="my-0 small">${org.address.line2},</p>
                <p class="my-0 small">${org.address.state}, ${org.address.country}.</p>
                <p class="my-0 small">${org.phone}</p>
                <p class="my-0 small">${org.website} ${org.email || ""}</p>
              </div>
              <div class="col-md-3 mt-auto">
                <div class="my-0 row small">
                  <p class="col-md-4 m-0 text-right">DATE:</p>
                  <p class="col-md-8 m-0">12-Mar-2021</p>
                </div>
                <div class="my-0 row small">
                  <p class="col-md-4 mt-1 text-right">NO:</p>
                  <p class="col-md-8 mt-1">${receipt.receiptNumber}</p>
                </div>
              </div>
            </div>
            <hr />

            <div class="row mt-3">
              <div class="col-md-10 mx-auto">
                <h5 class="my-2">${receipt.customerName}</h5>
                <p class="my-0 small">${receipt.address.line1},</p>
                <p class="my-0 small">${receipt.address.line2},</p>
                <p class="my-0 small">${receipt.address.state}, ${
    receipt.address.country
  }.</p>
                <p class="my-1">${receipt.phone}</p>
              </div>
            </div>
          </header>

          <main class="row my-4">
            <div class="col-md-10 mx-auto">
              <table class="table table-bordered table-striped">
                <thead class="table-info bg-light">
                  <tr>
                    <th scope="col" class="text-right">S/N</th>
                    <th scope="col">Item Description</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Unit Price</th>
                    <th scope="col">Items Price</th>
                  </tr>
                </thead>
                <tbody>
                    ${items}
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="4" class="text-right font-weight-bold" style="border: 0">
                      Total
                    </td>
                    <td colspan="4" class="text-right">${totalAmount}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <!-- <div class="col-md-10 mx-auto my-4">
              <p class="f">One million four hundred and fifty thousand naira only.</p>
            </div> -->
          </main>
          <footer>
            <div class="row mt-5">
              <div class="col-md-10 mx-auto bg-light my-auto py-4">
                <p class="m-0 text-center">THANK YOU FOR YOUR PATRONAGE</p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>`;
};
