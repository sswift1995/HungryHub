import React from "react";

export default function Navbar({ signOut }) {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#333', color: '#fff', padding: '10px' }}>
            <div style={{ display: 'flex', gap: '20px' }}>
                <p>Red Lantern</p>
                <p>Order Food</p>
            </div>
            <button style={{ padding: '10px', backgroundColor: "transparent", color: '#fff', border: '1px solid #fff', borderRadius: '5px', cursor: 'pointer' }} onClick={signOut}>Sign Out</button>
        </div>
    );
}
