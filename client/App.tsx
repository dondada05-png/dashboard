import "./global.css";

import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import AdminLogin from "./pages/admin/Login";
import AdminLayout from "./pages/admin/AdminLayout";
import Dashboard from "./pages/admin/Dashboard";
import Users from "./pages/admin/Users";
import LiveStreams from "./pages/admin/LiveStreams";
import Reports from "./pages/admin/Reports";
import Transactions from "./pages/admin/Transactions";
import Earnings from "./pages/admin/Earnings";
import Verification from "./pages/admin/Verification";
import Settings from "./pages/admin/Settings";
import Creators from "./pages/admin/Creators";
import UserProfile from "./pages/admin/UserProfile";
import Notifications from "./pages/admin/Notifications";
import AppealReview from "./pages/admin/AppealReview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Admin Login Route */}
            <Route path="/admin/login" element={<AdminLogin />} />
            {/* Protected Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute requireAdmin>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="users" element={<Users />} />
              <Route path="creators" element={<Creators />} />
              <Route path="creators/:userId" element={<UserProfile />} />
              <Route path="streams" element={<LiveStreams />} />
              <Route path="reports" element={<Reports />} />
              <Route path="transactions" element={<Transactions />} />
              <Route path="earnings" element={<Earnings />} />
              <Route path="verification" element={<Verification />} />
              <Route path="notifications" element={<Notifications />} />
              <Route
                path="notifications/:requestId"
                element={<AppealReview />}
              />
              <Route path="moderation" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
            </Route>
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
