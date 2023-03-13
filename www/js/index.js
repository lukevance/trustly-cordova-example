/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

const ACCESS_ID = 'YOUR_ACCESS_ID';
const MERCHANT_ID = 'YOUR_MERCHANT_ID';
const serverURL = null; // YOUR_SERVER_URL

const trustlyOptions = {
    closeButton: true,
    dragAndDrop: false,
    widgetContainerId: "trustlyWidget"
};

const returnEstablishData = () => {
    let lightboxRedirectURL = serverURL ? serverURL : "#";
    let data = {
      accessId: ACCESS_ID,
      // requestSignature: REQUEST_SIGNATURE,
      merchantId: MERCHANT_ID,
      description: 'transaction description',
      merchantReference: 'merchant reference',
      paymentType: 'Retrieval',
      returnUrl: `${lightboxRedirectURL}/return`,
      cancelUrl: `${lightboxRedirectURL}/cancel`,
      metadata: {
        integrationContext: "InAppBrowserNotify",
        urlScheme: "io.cordova.trustlydemo://oauth_callback"
      }
    };
    // check query params for mobile
    // if (params.get("integrationContext") && params.get("urlScheme")) {
    //     if (!data.metadata) data.metadata = {};
    //   data.metadata.urlScheme = `${params.get("urlScheme")}://`;
    //   data.metadata.integrationContext = params.get("integrationContext");
    // }
    return data;
};



function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    const establishData = returnEstablishData();
    
    window.Trustly.selectBankWidget(establishData, trustlyOptions)

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    // document.getElementById('deviceready').classList.add('ready');
}
