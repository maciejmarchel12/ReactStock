import React, { useEffect, useCallback } from "react";
import BarcodeReader from 'react-barcode-reader';
import { scanBarcode } from "../../api/reactStock-backend";
import { useNavigate } from 'react-router-dom';

const BarcodeScanner = ({ onBarcodeScanned, isSubtractMode }) => {
    const navigate = useNavigate();

    const handleBarcodeScan = useCallback(async (scannedBarcode) => {
        try {
            console.log('Is Subtract Mode:', isSubtractMode); // Checking if isSubtractMode is received correctly
            const product = await scanBarcode(scannedBarcode, isSubtractMode);
            if (product) {
                onBarcodeScanned(); // Notify parent component about successful barcode scan
            } else {
                console.log('Product not found');
            }
        } catch (error) {
            console.error('Error fetching product:', error);
        }
    }, [isSubtractMode, onBarcodeScanned]); //dependencies array

    // useEffect to update handleBarcodeScan when isSubtractMode changes
    useEffect(() => {
        // No cleanup needed
    }, [isSubtractMode, handleBarcodeScan]); // dependencies array 

    // Navigate to the InventoryPage after toggling the switch WIP
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
            <button onClick={handleToggleSubtractMode}>Toggle Subtract Mode</button>
        </div>
    );
};

export default BarcodeScanner;
