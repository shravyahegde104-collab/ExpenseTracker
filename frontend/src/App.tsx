import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import ExpensesList from "./pages/ExpensesList";
import AddExpense from "./pages/AddExpense";
import EditExpense from "./pages/EditExpense";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/expenses" element={<ExpensesList />} />
        <Route path="/expenses/new" element={<AddExpense />} />
        <Route path="/expenses/:id/edit" element={<EditExpense />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
