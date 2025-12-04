const privacyTexts = {
    en: {
        title: "Privacy Policy",
        content: `
            <h3>1. Data Controller</h3>
            <p>The following Privacy Policy outlines the handling of personal data collected through this game. The data controller is:</p>
            <p><strong>Amas Movsisyan</strong><br>Email: amas2017@icloud.com<br>Location: Holzwickede</p>
            <p><strong>Developer Akademie</strong><br>Address: Tassiloplatz 25, 81541 Munich<br>Email: info@developerakademie.com</p>
            <h3>2. Data Collection</h3>
            <p>No personal data is collected or stored when using this game. We do not collect any information about your activity, device, or location. No personal or sensitive data is ever gathered through this website or game.</p>
            <h3>3. Data Sharing</h3>
            <p>We do not share, sell, or transfer any personal information to third parties. All interactions are processed locally on your device without any external data transmission.</p>
            <h3>4. Liability</h3>
            <p>The use of this game is entirely at your own risk. Amas Movsisyan and Developer Akademie take no responsibility for any damages or losses resulting from the use of this game.</p>
            <h3>5. Cookies</h3>
            <p>This game does not use cookies or any tracking mechanisms to collect information about users.</p>
            <h3>6. Changes to this Privacy Policy</h3>
            <p>We reserve the right to update or change this Privacy Policy at any time. Any changes will be posted on this page and will take effect immediately after being published.</p>
            <h3>7. Contact</h3>
            <p>If you have any questions regarding this Privacy Policy, please contact us at amas2017@icloud.com.</p>
        `,
        backToHome: "Back to Home"
    },
    de: {
        title: "Datenschutzerklärung",
        content: `
            <h3>1. Verantwortlicher</h3>
            <p>Diese Datenschutzerklärung beschreibt, wie personenbezogene Daten durch dieses Spiel verarbeitet werden. Der Verantwortliche ist:</p>
            <p><strong>Amas Movsisyan</strong><br>Email: amas2017@icloud.com<br>Standort: Holzwickede</p>
            <p><strong>Developer Akademie</strong><br>Adresse: Tassiloplatz 25, 81541 München<br>Email: info@developerakademie.com</p>
            <h3>2. Datenerhebung</h3>
            <p>Es werden keine personenbezogenen Daten gesammelt oder gespeichert, wenn dieses Spiel genutzt wird. Wir erheben keine Informationen über Ihre Aktivitäten, Ihr Gerät oder Ihren Standort. Es werden keine persönlichen oder sensiblen Daten über diese Website oder das Spiel gesammelt.</p>
            <h3>3. Datenweitergabe</h3>
            <p>Wir geben keine persönlichen Daten an Dritte weiter, verkaufen sie oder übertragen sie auf andere Weise. Alle Interaktionen werden lokal auf Ihrem Gerät verarbeitet, ohne dass Daten an externe Server gesendet werden.</p>
            <h3>4. Haftung</h3>
            <p>Die Nutzung dieses Spiels erfolgt auf eigene Gefahr. Amas Movsisyan und Developer Akademie übernehmen keine Verantwortung für Schäden oder Verluste, die durch die Nutzung dieses Spiels entstehen.</p>
            <h3>5. Cookies</h3>
            <p>Dieses Spiel verwendet keine Cookies oder andere Tracking-Mechanismen zur Sammlung von Informationen über die Nutzer.</p>
            <h3>6. Änderungen dieser Datenschutzerklärung</h3>
            <p>Wir behalten uns das Recht vor, diese Datenschutzerklärung jederzeit zu aktualisieren oder zu ändern. Änderungen werden auf dieser Seite veröffentlicht und treten sofort nach Veröffentlichung in Kraft.</p>
            <h3>7. Kontakt</h3>
            <p>Wenn Sie Fragen zu dieser Datenschutzerklärung haben, kontaktieren Sie uns bitte unter amas2017@icloud.com.</p>
        `,
        backToHome: "Zurück zur Startseite"
    },
    es: {
        title: "Política de Privacidad",
        content: `
            <h3>1. Controlador de Datos</h3>
            <p>Esta Política de Privacidad describe cómo se manejan los datos personales recopilados a través de este juego. El controlador de los datos es:</p>
            <p><strong>Amas Movsisyan</strong><br>Email: amas2017@icloud.com<br>Ubicación: Holzwickede</p>
            <p><strong>Developer Akademie</strong><br>Dirección: Tassiloplatz 25, 81541 Munich<br>Email: info@developerakademie.com</p>
            <h3>2. Recolección de Datos</h3>
            <p>No recopilamos ni almacenamos ningún dato personal al usar este juego. No recopilamos ninguna información sobre su actividad, dispositivo o ubicación. No se recopilan datos personales ni sensibles a través de este sitio web o juego.</p>
            <h3>3. Compartir Datos</h3>
            <p>No compartimos, vendemos ni transferimos ninguna información personal a terceros. Todas las interacciones se procesan localmente en su dispositivo sin transmisión de datos a servidores externos.</p>
            <h3>4. Responsabilidad</h3>
            <p>El uso de este juego es bajo su propio riesgo. Amas Movsisyan y Developer Akademie no asumen ninguna responsabilidad por daños o pérdidas derivadas del uso de este juego.</p>
            <h3>5. Cookies</h3>
            <p>Este juego no utiliza cookies ni ningún mecanismo de seguimiento para recopilar información sobre los usuarios.</p>
            <h3>6. Cambios en esta Política de Privacidad</h3>
            <p>Nos reservamos el derecho de actualizar o cambiar esta Política de Privacidad en cualquier momento. Cualquier cambio se publicará en esta página y tendrá efecto inmediatamente después de ser publicado.</p>
            <h3>7. Contacto</h3>
            <p>Si tiene alguna pregunta sobre esta Política de Privacidad, contáctenos en amas2017@icloud.com.</p>
        `,
        backToHome: "Volver al inicio"
    }
};

function changeLanguage(lang) {
    document.title = privacyTexts[lang].title;
    document.getElementById('privacy-text').innerHTML = privacyTexts[lang].content;
    document.getElementById('back-to-home-btn').innerText = privacyTexts[lang].backToHome;
    document.getElementById('policy-title').innerText = privacyTexts[lang].title;
}

window.onload = function() {
    changeLanguage('en');
}
