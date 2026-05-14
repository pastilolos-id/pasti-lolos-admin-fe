import type { TransactionDisplayStatus, TransactionRow } from "./types";

function toDMY(iso: string): string {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) {
    return iso;
  }
  return `${d}/${m}/${y}`;
}

function formatPriceTable(amountIdr: number): string {
  return `Rp. ${amountIdr.toLocaleString("id-ID")}`;
}

const buyers: { name: string; email: string }[] = [
  {
    name: "Muhammad Tiar Ramadhan approv…",
    email: "tiar.ramadhan@email.com",
  },
  {
    name: "Siti Nurhaliza Lestari Putri Dewi",
    email: "siti.nurhaliza.lestari.putri@email.test",
  },
  {
    name: "Budi Santoso",
    email: "budi.santoso@email.test",
  },
  {
    name: "Rina Kusuma Wardhani",
    email: "rina.kusuma@email.test",
  },
  {
    name: "Arief Wijaya Pratama",
    email: "arief.wijaya@email.test",
  },
];

const isoDates = [
  "2026-01-12",
  "2026-01-18",
  "2026-01-22",
  "2026-01-28",
  "2026-02-02",
  "2026-02-06",
  "2026-02-10",
  "2026-02-14",
];

const statusCycle: TransactionDisplayStatus[] = [
  "berhasil",
  "berhasil",
  "gagal",
  "berhasil",
  "berhasil",
  "menunggu",
  "berhasil",
  "kadaluarsa",
];

export const transactionsMock: TransactionRow[] = Array.from(
  { length: 24 },
  (_, i) => {
    const buyer = buyers[i % buyers.length] ?? buyers[0];
    const iso = isoDates[i % isoDates.length] ?? "2026-01-01";
    const amountIdr = 60000 + (i % 7) * 15000 + (i % 4) * 25000;
    const displayStatus =
      statusCycle[i % statusCycle.length] ?? "menunggu";
    const codeNum = 40220 + i;
    return {
      id: `trx-${i + 1}`,
      transactionCode: `TRANS${codeNum}`,
      buyerName: buyer.name,
      buyerEmail: buyer.email,
      hasProofThumbnail: i % 5 !== 2 ? 1 : 0,
      transactionDateIso: iso,
      transactionDateDisplay: toDMY(iso),
      priceIdr: amountIdr,
      priceDisplay: formatPriceTable(amountIdr),
      displayStatus,
    };
  },
);
