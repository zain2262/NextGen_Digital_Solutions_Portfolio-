// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");

menuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");

    const icon = menuBtn.querySelector("i");

    if (navMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");
    } else {
        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    }
});


// Close mobile menu after clicking a link

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");

        const icon = menuBtn.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");
    });
});


// =========================
// PORTFOLIO FILTER
// =========================

const filterButtons = document.querySelectorAll(".filter-btn");
const portfolioItems = document.querySelectorAll(".portfolio-item");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.getAttribute("data-filter");

        portfolioItems.forEach(item => {

            const category = item.getAttribute("data-category");

            if (filter === "all" || category === filter) {
                item.style.display = "block";
            } else {
                item.style.display = "none";
            }

        });

    });

});


// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", function (event) {

    event.preventDefault();

    alert("Thank you! Your message has been received.");

    contactForm.reset();

});


// =========================
// CURRENT YEAR
// =========================

document.getElementById("year").textContent = new Date().getFullYear();


// =========================
// SIMPLE SCROLL ANIMATION
// =========================

const animatedElements = document.querySelectorAll(
    ".service-card, .about-box, .portfolio-item, .process-item, .team-card, .why-item"
);

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

            }

        });

    },
    {
        threshold: 0.1
    }
);


animatedElements.forEach(element => {

    element.style.opacity = "0";
    element.style.transform = "translateY(25px)";
    element.style.transition = "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(element);

});

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (e) {

        e.preventDefault();

        // Get form values
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        // WhatsApp number
        const whatsappNumber = "923292361251";

        // WhatsApp message
        const whatsappMessage =
`Hello NextGen Digital Solution,

New Website Inquiry

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

Thank you.`;

        // Encode message for URL
        const encodedMessage = encodeURIComponent(whatsappMessage);

        // WhatsApp URL
        const whatsappURL =
            `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

        // Email
        const emailAddress = "zainulabedin924622@gmail.com";

        const emailSubject =
            encodeURIComponent(`New Website Inquiry: ${subject}`);

        const emailBody =
            encodeURIComponent(
`New Website Inquiry

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`
            );

        const emailURL =
            `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;

        // Open WhatsApp
        window.open(whatsappURL, "_blank");

        // Open email
        window.location.href = emailURL;

        // Reset form
        contactForm.reset();

    });

});


/* =========================================================
   NEXTGEN AI CHATBOT - N8N INTEGRATION
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    const chatToggle = document.getElementById("aiChatToggle");
    const chatWindow = document.getElementById("aiChatWindow");
    const chatClose = document.getElementById("aiChatClose");

    const chatInput = document.getElementById("aiChatInput");
    const chatSend = document.getElementById("aiChatSend");

    const chatMessages = document.getElementById("aiChatMessages");
    const typingIndicator = document.getElementById("aiTyping");


    /* =====================================================
       N8N PRODUCTION WEBHOOK
    ===================================================== */

    const N8N_WEBHOOK_URL =
        "https://zainn8n98.app.n8n.cloud/webhook/client-messages";


    /* =====================================================
       SESSION ID
    ===================================================== */

   let sessionId = sessionStorage.getItem("nextgen_ai_session_id");

    if (!sessionId) {
        if (window.crypto && crypto.randomUUID) {
            sessionId = "C-" + crypto.randomUUID();
        } else {
            sessionId =
                "C-" +
                Date.now() +
                "-" +
                Math.random().toString(36).substring(2, 8);
        }

        sessionStorage.setItem(
            "nextgen_ai_session_id",
            sessionId
        );
    }


    /* =====================================================
       OPEN CHAT
    ===================================================== */

    function openChat() {

        chatWindow.classList.add("active");

        setTimeout(function () {
            chatInput.focus();
        }, 250);
    }


    /* =====================================================
       CLOSE CHAT
    ===================================================== */

    function closeChat() {

        chatWindow.classList.remove("active");
    }


    chatToggle.addEventListener("click", function () {

        if (chatWindow.classList.contains("active")) {
            closeChat();
        } else {
            openChat();
        }

    });


    chatClose.addEventListener("click", closeChat);


    /* =====================================================
       ADD MESSAGE
    ===================================================== */

    function addMessage(message, type = "bot") {

        const messageWrapper =
            document.createElement("div");

        messageWrapper.className =
            `ai-message ${type === "user" ? "user-message" : "bot-message"}`;


        const avatar =
            document.createElement("div");

        avatar.className =
            "ai-message-avatar";

        avatar.innerHTML =
            type === "user"
                ? '<i class="fas fa-user"></i>'
                : '<i class="fas fa-robot"></i>';


        const content =
            document.createElement("div");

        content.className =
            "ai-message-content";


        const bubble =
            document.createElement("div");

        bubble.className =
            "ai-message-bubble";

        /*
         * textContent is intentionally used instead of
         * innerHTML for AI/user messages.
         * This prevents HTML/script injection.
         */

        bubble.textContent = message;


        const time =
            document.createElement("span");

        time.className =
            "ai-message-time";

        time.textContent =
            getCurrentTime();


        content.appendChild(bubble);
        content.appendChild(time);

        messageWrapper.appendChild(avatar);
        messageWrapper.appendChild(content);

        chatMessages.appendChild(messageWrapper);

        scrollToBottom();
    }


    /* =====================================================
       CURRENT TIME
    ===================================================== */

    function getCurrentTime() {

        return new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    }


    /* =====================================================
       SCROLL TO BOTTOM
    ===================================================== */

    function scrollToBottom() {

        chatMessages.scrollTop =
            chatMessages.scrollHeight;

    }


    /* =====================================================
       TYPING INDICATOR
    ===================================================== */

    function showTyping() {

        typingIndicator.classList.add("active");

        scrollToBottom();
    }


    function hideTyping() {

        typingIndicator.classList.remove("active");

    }


    /* =====================================================
       SEND MESSAGE
    ===================================================== */

    async function sendMessage() {

        const message =
            chatInput.value.trim();


        if (!message) {
            return;
        }


        /*
         * Prevent excessively large requests
         */

        if (message.length > 1000) {

            addMessage(
                "Please keep your message under 1000 characters.",
                "bot"
            );

            return;
        }


        /* Add user message */

        addMessage(message, "user");


        /* Clear input */

        chatInput.value = "";

        autoResizeTextarea();


        /* Disable button */

        chatSend.disabled = true;


        /* Show typing */

        showTyping();


        try {

            const response =
                await fetch(
                    N8N_WEBHOOK_URL,
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/json"
                        },

                        body: JSON.stringify({

                            message: message,

                            sessionId: sessionId

                        })
                    }
                );


            if (!response.ok) {

                throw new Error(
                    `Server returned ${response.status}`
                );

            }


            const data =
                await response.json();


            /*
             * Your n8n Respond to Webhook node
             * returns:
             *
             * {
             *     "reply": "AI response"
             * }
             */

            const reply =
                data.reply ||
                data.output ||
                data.message;


            if (!reply) {

                throw new Error(
                    "No reply received from AI"
                );

            }


            hideTyping();


            addMessage(
                String(reply),
                "bot"
            );


        } catch (error) {

            console.error(
                "NextGen AI Chatbot Error:",
                error
            );


            hideTyping();


            addMessage(
                "Sorry, I'm having trouble connecting right now. Please try again in a moment or contact our team directly on WhatsApp.",
                "bot"
            );

        } finally {

            chatSend.disabled = false;

            chatInput.focus();

        }

    }


    /* =====================================================
       SEND BUTTON
    ===================================================== */

    chatSend.addEventListener(
        "click",
        sendMessage
    );


    /* =====================================================
       ENTER KEY
    ===================================================== */

    chatInput.addEventListener(
        "keydown",
        function (event) {

            /*
             * Enter = Send
             *
             * Shift + Enter = New Line
             */

            if (
                event.key === "Enter" &&
                !event.shiftKey
            ) {

                event.preventDefault();

                sendMessage();

            }

        }
    );


    /* =====================================================
       AUTO RESIZE TEXTAREA
    ===================================================== */

    function autoResizeTextarea() {

        chatInput.style.height = "auto";

        chatInput.style.height =
            Math.min(
                chatInput.scrollHeight,
                100
            ) + "px";

    }


    chatInput.addEventListener(
        "input",
        autoResizeTextarea
    );


    /* =====================================================
       ESC KEY CLOSE
    ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                chatWindow.classList.contains("active")
            ) {

                closeChat();

            }

        }
    );

});