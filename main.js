document.addEventListener("DOMContentLoaded", () => {
    const statsTable = document.querySelector("#statsTable tbody");
    const addPlayerButton = document.getElementById("addPlayer");
    const exportCSVButton = document.getElementById("exportCSV");
    const exportPDFButton = document.getElementById("exportPDF");

    let playerCount = 0;

    // Ajouter un joueur
    addPlayerButton.addEventListener("click", () => {
        if (playerCount >= 12) {
            alert("Vous ne pouvez pas ajouter plus de 12 joueurs.");
            return;
        }
        const row = document.createElement("tr");

        row.innerHTML = `
            <td><input type="text" placeholder="Nom du joueur"></td>
            <td><input type="number" value="0" min="0"></td>
            <td><input type="number" value="0" min="0"></td>
            <td><input type="number" value="0" min="0"></td>
            <td><button class="delete">Supprimer</button></td>
        `;

        statsTable.appendChild(row);
        playerCount++;

        // Supprimer un joueur
        row.querySelector(".delete").addEventListener("click", () => {
            row.remove();
            playerCount--;
        });
    });

    // Exporter au format CSV
    exportCSVButton.addEventListener("click", () => {
        const rows = Array.from(statsTable.rows);
        const data = rows.map(row =>
            Array.from(row.querySelectorAll("input")).map(input => input.value)
        );
        const csvContent = "data:text/csv;charset=utf-8,"
            + data.map(e => e.join(",")).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "stats.csv");
        document.body.appendChild(link);
        link.click();
        link.remove();
    });

    // Exporter au format PDF
    exportPDFButton.addEventListener("click", () => {
        const jsPDF = window.jspdf.jsPDF;
        const doc = new jsPDF();
        doc.text("Statistiques des Joueurs", 10, 10);
        let y = 20;
        statsTable.querySelectorAll("tr").forEach((row, index) => {
            const values = Array.from(row.querySelectorAll("input")).map(input => input.value);
            doc.text(`${index + 1}. ${values.join(" | ")}`, 10, y);
            y += 10;
        });
        doc.save("stats.pdf");
    });
});
