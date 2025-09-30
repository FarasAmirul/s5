import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableHeader, TableRow, TableCell, TableBody } from "@/components/ui/table";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function Dashboard() {
  const [weights, setWeights] = useState({
    stok: 0.3,
    penjualan: 0.3,
    leadtime: 0.2,
    harga: 0.2,
  });

  const [data, setData] = useState([
    { nama: "Kertas A4", stok: 20, penjualan: 80, leadtime: 3, harga: 50000 },
    { nama: "Tinta Printer", stok: 5, penjualan: 60, leadtime: 7, harga: 120000 },
    { nama: "Pulpen", stok: 50, penjualan: 100, leadtime: 2, harga: 3000 },
  ]);

  const [newItem, setNewItem] = useState({ nama: "", stok: "", penjualan: "", leadtime: "", harga: "" });

  const handleChangeWeight = (key, value) => {
    setWeights({ ...weights, [key]: parseFloat(value) || 0 });
  };

  const handleChangeItem = (key, value) => {
    setNewItem({ ...newItem, [key]: value });
  };

  const addItem = () => {
    if (!newItem.nama) return;
    setData([
      ...data,
      {
        nama: newItem.nama,
        stok: parseInt(newItem.stok) || 0,
        penjualan: parseInt(newItem.penjualan) || 0,
        leadtime: parseInt(newItem.leadtime) || 0,
        harga: parseInt(newItem.harga) || 0,
      },
    ]);
    setNewItem({ nama: "", stok: "", penjualan: "", leadtime: "", harga: "" });
  };

  // Normalisasi sederhana (dummy SAW)
  const max = {
    stok: Math.max(...data.map((d) => d.stok)),
    penjualan: Math.max(...data.map((d) => d.penjualan)),
    leadtime: Math.min(...data.map((d) => d.leadtime)), // benefit dibalik
    harga: Math.min(...data.map((d) => d.harga)), // cost
  };

  const hasil = data.map((d) => {
    const normStok = 1 - d.stok / max.stok; // stok lebih kecil = prioritas
    const normPenjualan = d.penjualan / max.penjualan;
    const normLead = max.leadtime / d.leadtime;
    const normHarga = max.harga / d.harga;

    const score =
      normStok * weights.stok +
      normPenjualan * weights.penjualan +
      normLead * weights.leadtime +
      normHarga * weights.harga;

    return { ...d, score: score.toFixed(3) };
  });

  const ranking = [...hasil].sort((a, b) => b.score - a.score);

  return (
    <div className="p-6 grid grid-cols-1 gap-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold">Dashboard SPK - SAW</h1>

      {/* Form Bobot Kriteria */}
      <Card>
        <CardContent>
          <h2 className="font-semibold mb-2">Pengaturan Bobot Kriteria</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.keys(weights).map((key) => (
              <div key={key} className="flex flex-col">
                <Label className="capitalize">{key}</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={weights[key]}
                  onChange={(e) => handleChangeWeight(key, e.target.value)}
                />
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Jumlah bobot sebaiknya mendekati 1.0 (100%).
          </p>
        </CardContent>
      </Card>

      {/* Form Tambah Barang */}
      <Card>
        <CardContent>
          <h2 className="font-semibold mb-2">Tambah Barang Baru</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.keys(newItem).map((key) => (
              <div key={key} className="flex flex-col">
                <Label className="capitalize">{key}</Label>
                <Input
                  type={key === "nama" ? "text" : "number"}
                  value={newItem[key]}
                  onChange={(e) => handleChangeItem(key, e.target.value)}
                />
              </div>
            ))}
          </div>
          <Button className="mt-4" onClick={addItem}>
            Tambah Barang
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="font-semibold mb-2">Rekomendasi Penambahan Stok</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableCell>Barang</TableCell>
                <TableCell>Stok</TableCell>
                <TableCell>Penjualan</TableCell>
                <TableCell>Lead Time</TableCell>
                <TableCell>Harga</TableCell>
                <TableCell>Skor SAW</TableCell>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ranking.map((item, i) => (
                <TableRow key={i}>
                  <TableCell>{item.nama}</TableCell>
                  <TableCell>{item.stok}</TableCell>
                  <TableCell>{item.penjualan}</TableCell>
                  <TableCell>{item.leadtime} hari</TableCell>
                  <TableCell>Rp {item.harga}</TableCell>
                  <TableCell className="font-bold">{item.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <h2 className="font-semibold mb-2">Visualisasi Ranking</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={ranking}>
              <XAxis dataKey="nama" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="score" fill="#4f46e5" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
