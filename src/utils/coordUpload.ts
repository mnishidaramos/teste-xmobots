type dataType = {
    aerodromes: [{
        name: string,
        city: string,
        description: string,
        created_at: string,
        runways: [{
            name: string,
            length: number,
            width: number,
        }],
    }],
}

export type coordListType = {
    lista: coordType[],
};

export type coordType = {
    id: number,
    nome: string,
    cidade: string,
    dms: { lat: string, lng: string },
    dataDeCriacao: string,
    quantidadeDePistas: number,
}

/** 
Padrão 1: 998877S/0998877W - onde:
99(hora), 88(minuto) 77(segundo), S(indicador), W(indicador)

Padrão 2: 998877.77S/0998877.77W – onde:
99 (hora), 88 (minuto), 77.77 (segundo com casas decimais separadas por ponto), S(indicador), W(indicador)

Padrão 3: 998877,77S/0998877,77W
99(hora), 88(minuto), 77,77 (segundo com casas decimais separadas por virgula), S(indicador), W(indicador)
 */

export const coordUpload = function (uploadFile: dataType) {
    //Regex para selecionar as coordenadas aceitando as 3 formas acima
    const coordRegex = new RegExp('(([0-9]{6})[N|S]\/([0-9]{7})[E|W])|(([0-9]{6})[\.|\,]([0-9]{2})[N|S]\/([0-9]{7})[\.|\,]([0-9]{2})[E|W])');
    const aerodromes = uploadFile.aerodromes;
    const coordList = { lista: [] } as coordListType;
    let coord = {} as coordType;
    let regexResult: string[] = [];
    if (aerodromes && aerodromes.length > 0) {
        for (let i = 0; i < aerodromes.length; i++) {
            let aerodrome = aerodromes.at(i);
            regexResult = (coordRegex.exec(aerodrome!.description)?.at(0)?.split('/'))!;
            coord = ({
                id: i,
                nome: aerodrome!.name,
                cidade: aerodrome!.city,
                dms: {
                    lat: regexResult[0],
                    lng: regexResult[1],
                },
                dataDeCriacao: aerodrome!.created_at,
                quantidadeDePistas: aerodrome!.runways.length,
            });
            coordList.lista.push(coord);
        };

    }
    return coordList;
}