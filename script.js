document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. PORTFOLIO TOGGLE (1-KLIK FIX) ---
    const toggleBtn = document.getElementById('toggleBtn');
    const gallery = document.getElementById('gallery');

    if (toggleBtn && gallery) {
        toggleBtn.addEventListener('click', () => {
            // Aktiverer CSS animationen via .show klassen
            gallery.classList.toggle('show');
            
            // Skifter teksten på knappen
            if (gallery.classList.contains('show')) {
                toggleBtn.textContent = 'SKJUL VÆRKER';
            } else {
                toggleBtn.textContent = 'TJEK MINE VÆRKER';
            }
        });
    }

    // --- 2. BESTIL KNAP (SMOOTH SCROLL) ---
    const orderBtn = document.getElementById('orderBtn');
    if (orderBtn) {
        orderBtn.addEventListener('click', () => {
            const contactSection = document.getElementById('contactSection');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
                // Giver fokus til navnefeltet efter scroll
                setTimeout(() => { document.getElementById('name').focus(); }, 800);
            }
        });
    }

    // --- 3. SPECIELLE FARVER TOGGLE (1-KLIK FIX) ---
    const colorToggleBtn = document.getElementById('colorToggleBtn');
    const colorInputField = document.getElementById('colorInputField');

    if (colorToggleBtn && colorInputField) {
        colorToggleBtn.addEventListener('click', () => {
            colorInputField.classList.toggle('show');
            
            if (colorInputField.classList.contains('show')) {
                colorToggleBtn.textContent = 'FORTRYD FARVER';
            } else {
                colorToggleBtn.textContent = 'SPECIELLE FARVER?';
                document.getElementById('specialColors').value = ''; // Nulstiller feltet
            }
        });
    }

    // --- 4. DISCORD WEBHOOK & FEEDBACK SYSTEM (INGEN POPS) ---
    const contactForm = document.getElementById('contactForm');
    const feedback = document.getElementById('formFeedback'); // Husk at have <p id="formFeedback"> i din HTML

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const sendBtn = document.getElementById('sendBtn');
            const discordURL = "https://discord.com/api/webhooks/1416809436978352148/3yrXYwAJ4oxmfR0tcRkjf_vdVMWZGvIUNdd4cnw-csDYcUrXFf41yA79OKchgzBrTsv_"; // Sæt din Discord link her!

            // Nulstil feedback-beskeden
            feedback.textContent = "";
            feedback.style.opacity = "1";

            const payload = {
                content: `🎨 **BUM! NY BESTILLING MODTAGET!**`,
                embeds: [{
                    title: "Kunde: " + document.getElementById('name').value,
                    description: document.getElementById('message').value,
                    fields: [
                        { name: "🏠 Kontakt Info", value: document.getElementById('contactInfo').value },
                        { name: "🌈 Specielle Farver", value: document.getElementById('specialColors').value || "Ingen valgt" }
                    ],
                    color: 65280 // Neon grøn farve i Discord
                }]
            };

            // Vis at vi arbejder
            sendBtn.textContent = "SENDER...";
            sendBtn.disabled = true;

            try {
                const response = await fetch(discordURL, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (response.ok) {
                    // SUCCES: Skriv grøn tekst under knappen
                    feedback.style.color = "var(--main-accent)";
                    feedback.textContent = "FATTET! BESKEDEN ER SENDT.";
                    
                    contactForm.reset();
                    if (colorInputField) colorInputField.classList.remove('show');
                    
                    // Fjern teksten igen efter 5 sekunder
                    setTimeout(() => { feedback.style.opacity = "0"; }, 5000);
                } else {
                    throw new Error("Fejl i Webhook");
                }
            } catch (error) {
                // FEJL: Skriv magenta tekst under knappen
                feedback.style.color = "var(--second-accent)";
                feedback.textContent = "FEJL! PRØV IGEN SENERE.";
            } finally {
                // Gør knappen klar igen
                sendBtn.textContent = "SEND BESKED";
                sendBtn.disabled = false;
            }
        });
    }
});
