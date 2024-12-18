export const salesData = {
  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Sales",
      data: [3000, 4500, 3200, 5600, 4800, 6000],
      borderColor: "#1976d2",
      tension: 0.4,
    },
  ],
};

export const categoryData = {
  labels: ["Electronics", "Clothing", "Books", "Food", "Others"],
  datasets: [
    {
      label: "Sales by Category",
      data: [12000, 8000, 5000, 7000, 4000],
      backgroundColor: ["#1976d2", "#2196f3", "#64b5f6", "#90caf9", "#bbdefb"],
    },
  ],
};

export const recentSales = [
  { id: "TR001", customer: "John Doe", amount: 1200, date: "2024-01-15" },
  { id: "TR002", customer: "Jane Smith", amount: 850, date: "2024-01-14" },
  { id: "TR003", customer: "Bob Wilson", amount: 2300, date: "2024-01-13" },
  { id: "TR004", customer: "Alice Brown", amount: 760, date: "2024-01-12" },
  { id: "TR005", customer: "Charlie Davis", amount: 1500, date: "2024-01-11" },
];
