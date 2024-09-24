// Função de Login
document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (response.ok) {
            localStorage.setItem('token', data.token);
            window.location.href = 'cadastro.html';  // Redireciona para o cadastro de mercadorias
        } else {
            document.getElementById('login-error').textContent = data.message;
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});

// Função de Cadastro de Mercadorias
document.getElementById('product-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const barcode = document.getElementById('barcode').value;
    const description = document.getElementById('description').value;
    const ncm = document.getElementById('ncm').value;
    const purchasePrice = document.getElementById('purchasePrice').value;
    const salePrice = document.getElementById('salePrice').value;
    const salePercent = document.getElementById('salePercent').value;
    const stock = document.getElementById('stock').value;

    try {
        const response = await fetch('http://localhost:5000/api/products/create', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ barcode, description, ncm, purchasePrice, salePrice, salePercent, stock })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Produto cadastrado com sucesso!');
            window.location.href = 'estoque.html';  // Redireciona para a tela de estoque
        } else {
            document.getElementById('product-error').textContent = data.message;
        }
    } catch (error) {
        console.error('Erro:', error);
    }
});

// Função para Listar Produtos no Estoque
async function loadStock() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('C', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const products = await response.json();
        const stockTable = document.getElementById('stock-data');

        products.forEach(product => {
            const row = `<tr>
                <td>${product.barcode}</td>
                <td>${product.description}</td>
                <td>${product.ncm}</td>
                <td>${product.purchaseprice}</td>
                <td>${product.saleprice}</td>
                <td>${product.salepercent}</td>
                <td>${product.stock}</td>
            </tr>`;
            stockTable.insertAdjacentHTML('beforeend', row);
        });
    } catch (error) {
        console.error('Erro ao carregar estoque:', error);
    }
}

// Função para Registrar Vendas
document.getElementById('sale-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    const productId = document.getElementById('productId').value;
    const quantity = document.getElementById('quantity').value;

    try {
        const response = await fetch('http://localhost:5000/api/sales/create', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` 
            },
            body: JSON.stringify({ productId, quantity })
        });
        const data = await response.json();
        if (response.ok) {
            alert('Venda registrada com sucesso!');
        } else {
            document.getElementById('sale-error').textContent = data.message;
        }
    } catch (error) {
        console.error('Erro ao registrar venda:', error);
    }
});

// Carregar estoque automaticamente na página de estoque
if (document.body.contains(document.getElementById('stock-table'))) {
    loadStock();
}
