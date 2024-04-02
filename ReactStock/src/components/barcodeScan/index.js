import React, { useEffect, useCallback } from "react";
import BarcodeReader from 'react-barcode-reader';
import { scanBarcode } from "../../api/reactStock-backend";
import { useNavigate } from 'react-router-dom';

const BarcodeScanner = ({ onBarcodeScanned, isSubtractMode }) => {
    const navigate = useNavigate(); // Get the navigate function from the hook

    // Define handleBarcodeScan as a memoized callback to prevent unnecessary re-renders
    const handleBarcodeScan = useCallback(async (scannedBarcode) => {
        try {
            console.log('Is Subtract Mode:', isSubtractMode); // Check if isSubtractMode is received correctly
            const product = await scanBarcode(scannedBarcode, isSubtractMode);
            if (product) {
                onBarcodeScanned(); // Notify parent component about successful barcode scan
            } else {
                console.log('Product not found');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }, [isSubtractMode, onBarcodeScanned]); // Include isSubtractMode and onBarcodeScanned in the dependencies array

    // Use useEffect to update handleBarcodeScan when isSubtractMode changes
    useEffect(() => {
        // No cleanup needed
    }, [isSubtractMode, handleBarcodeScan]); // Include isSubtractMode and handleBarcodeScan in the dependencies array

    // Navigate to the InventoryPage after toggling the switch
    const handleToggleSubtractMode = () => {
        navigate('/inventoryPage');
    };

    return (
        <div>
            <BarcodeReader
                onError={(error) => console.error('Error reading barcode:', error)}
                onScan={handleBarcodeScan} // Pass the scan handler function
                resolution={640}
                facingMode="environment" // Use the rear camera for scanning (if available)
                constraints={{ width: 640, height: 480 }}
                style={{ width: '100%', height: '100%' }}
            />
            {/* You can add a button or any other UI element to toggle the subtract mode */}
            <button onClick={handleToggleSubtractMode}>Toggle Subtract Mode</button>
        </div>
    );
};

export default BarcodeScanner;
