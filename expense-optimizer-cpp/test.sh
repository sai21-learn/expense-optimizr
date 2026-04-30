#!/bin/bash

# Change to the directory where main.cpp is located
cd "$(dirname "$0")"

# Compile
echo "[*] Compiling C++ code..."
g++ -O3 main.cpp -o optimizer

if [ $? -eq 0 ]; then
    echo "[+] Compilation successful."
else
    echo "[-] Compilation failed."
    exit 1
fi

# Run with automated input
echo "[*] Running automated test case..."
./optimizer << 'EOF'
1
Alice
1200
1
Bob
350
1
Charlie
150
3
4
6
EOF

echo "[*] Test complete."
