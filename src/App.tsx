import { Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
import Login from "./pages/auth/Login.tsx";
import Dashboard from "./pages/dashboard/Dashboard.tsx";

function App() {
    return (
        <Routes>
            <Route
                path="/sso-callback"
                element={<AuthenticateWithRedirectCallback signUpForceRedirectUrl="/dashboard" signInForceRedirectUrl="/dashboard" />}
            />

            <Route path="/dashboard" element={
                <>
                    <SignedIn>
                        <Dashboard />
                    </SignedIn>
                    <SignedOut>
                        <Navigate to="/login" replace />
                    </SignedOut>
                </>
            } />

            <Route path="/login" element={
                <>
                    <SignedIn>
                        <Navigate to="/dashboard" replace />
                    </SignedIn>
                    <SignedOut>
                        <Login />
                    </SignedOut>
                </>
            } />

            <Route path="/" element={
                <>
                    <SignedIn>
                        <Navigate to="/dashboard" replace />
                    </SignedIn>
                    <SignedOut>
                        <Navigate to="/login" replace />
                    </SignedOut>
                </>
            } />
        </Routes>
    );
}

export default App;