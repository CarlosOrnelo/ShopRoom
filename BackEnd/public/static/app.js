

async function goToProduct(id) {

    const url = `http://localhost:3000/product/${id}`
    window.location.href = url

};

async function calculoFrete(weight, format, length, heigth, width, diameter) {
    
    if (document.getElementById('cep')) {
        var cep = document.getElementById('cep').value;
        var quantity = document.getElementById('quantidade').value;
        weight = weight * quantity
        heigth = heigth * quantity
        diameter = diameter * quantity
    }
    else {
        var cep = document.getElementById('cepCart').value;
        var quantity = document.getElementById('quantityCart').value;
    }

    
    var args = {
        sCepOrigem: "03044000", // Cep Origem
        sCepDestino: cep, // Cep Destino
        nVlPeso: Math.round(weight, 1), // Peso incluindo a embalagem, em kilogramas 
        nCdFormato: format, // 1 - Caixa Pacote | 2 - Rolo Prisma | 3 - Envelope
        nVlComprimento: Math.round(length, 1), // Comprimento em cm
        nVlAltura: heigth, // Altura em cm
        nVlLargura: Math.round(width, 1), // Largura em cm
        nCdServico: '04014', // Tipo de serviço, por exemplo, Sedex ou Pac --- 04510 PAC
        nVlDiametro: diameter // Diametro em cm
    }

    console.log(quantity);
    console.log(args);

    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const urlSedex = `http://ws.correios.com.br/calculador/CalcPrecoPrazo.aspx?nCdEmpresa=&sDsSenha=&sCepOrigem=${args.sCepOrigem}&sCepDestino=${args.sCepDestino}&nVlPeso=${args.nVlPeso}&nCdFormato=${args.nCdFormato}&nVlComprimento=${args.nVlComprimento}&nVlAltura=${args.nVlAltura}&nVlLargura=${args.nVlLargura}&sCdMaoPropria=n&nVlValorDeclarado=0&sCdAvisoRecebimento=n&nCdServico=${args.nCdServico}&nVlDiametro=${args.nVlDiametro}&StrRetorno=xml&nIndicaCalculo=3`


    const parser = new DOMParser();

    
    const response = await Promise.all([
        fetch(proxyurl + urlSedex), 
    ]);
    
    const responseSedex = await response[0].text();
    
    const convertedSedex = parser.parseFromString(responseSedex, 'text/xml');
    
    // Product Page
    if (document.getElementById('sedexName')) {
        document.getElementById('sedexName').innerText = 'Sedex'
        document.getElementById('prazoFreteSedex').innerText = convertedSedex.getElementsByTagName('PrazoEntrega')[0].childNodes[0].nodeValue + " Dias";
        document.getElementById('valorFreteSedex').innerText = "R$" + convertedSedex.getElementsByTagName('Valor')[0].childNodes[0].nodeValue;
    }
    // Cart Page
    else {
        console.log(convertedSedex)
        document.getElementById('sedexNameCart').innerText = 'Sedex'
        document.getElementById('prazoFreteSedexCart').innerText = convertedSedex.getElementsByTagName('PrazoEntrega')[0].childNodes[0].nodeValue + " Dias";
        document.getElementById('valorFreteSedexCart').innerText = "R$" + convertedSedex.getElementsByTagName('Valor')[0].childNodes[0].nodeValue;
        const valorFrete = parseFloat(convertedSedex.getElementsByTagName('Valor')[0].childNodes[0].nodeValue);
        const subTotal = parseFloat(document.getElementById('subTotal').innerText);
        
        document.getElementById('valorCheio').value = valorFrete + subTotal;
        document.getElementById('valorTotal').innerText = valorFrete + subTotal
    }


};


