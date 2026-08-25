/* =========================================================
   CLUB ONE EVENT REGISTRATION
========================================================= */

const registrationForm =
    document.getElementById("eventRegistrationForm");


if (registrationForm) {

    registrationForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const parentName =
                document.getElementById("parentName")
                .value
                .trim();


            const wardName =
                document.getElementById("wardName")
                .value
                .trim();


            const wardSchool =
                document.getElementById("wardSchool")
                .value
                .trim();


            const cardRegistered =
                document.querySelector(
                    'input[name="cardRegistered"]:checked'
                )?.value;


            const getCardAtEvent =
                document.querySelector(
                    'input[name="getCardAtEvent"]:checked'
                )?.value;


            if (
                !parentName ||
                !wardName ||
                !wardSchool ||
                !cardRegistered ||
                !getCardAtEvent
            ) {

                alert(
                    "Please complete all registration fields."
                );

                return;

            }


            /* =================================================
               WHATSAPP MESSAGE
            ================================================= */

            const message =

`Hello Club One,

I would like to register for the Club One Back-to-School Fair 2026.

EVENT:
Back-to-School Fair 2026
August 28–29, 2026
Ikeja City Mall, Lagos

REGISTRATION DETAILS

Parent Name:
${parentName}

Ward (Child) Name(s):
${wardName}

Ward School:
${wardSchool}

I have registered for the Club One Card:
${cardRegistered}

I would like to get the Club One Card at the event:
${getCardAtEvent}

Thank you.

Club One Back-to-School Event Registration`;


            const encodedMessage =
                encodeURIComponent(message);


            const whatsappNumber =
                "2347037170129";


            const whatsappURL =
                `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;


            /* =================================================
               OPEN WHATSAPP
            ================================================= */

            window.location.href = whatsappURL;

        }
    );

}
