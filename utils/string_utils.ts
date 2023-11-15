let iterations = 0;
const base = 'abcdefghijklmnopqrstuvwxyz'.split('');
base.sort(() => Math.random() - 0.5);

const reserved = ["if", "in", "do"];

function shuffleArray(array: any) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default {
    shuffleArray,
    calculateChecksum: function(string: string) {
        var src = string.toString();
        var checksum = 0;
    
        for (var i = 0; i < src.length; i++) {
            var charCode = src.charCodeAt(i);
    
            if (charCode != 32) {
                var result = charCode ^ 24;
                checksum += result;
            }
        }
    
        return checksum;
    },
    make_hex_string_no_num: function (length: number) {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += Math.round(10 + Math.random() * 5).toString(16); // DOES NOT INCLUDES NUMERIC CHARACTERS ( CRINGE )
        }
        return result;
    },
    make_hex_string: function (length: number) {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += Math.floor(Math.random() * 16).toString(16); // INCLUDES NUMERIC CHARACTERS ( CRINGE )
        }
        return result;
    },
    make_bar_code_string: function (length: number) {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += Math.random() > 0.5 ? "i" : "l";
        }
        return result;
    },
    make_number_string: function (length: number) {
        let result = "";
        for (let i = 0; i < length; i++) {
            result += Math.round(Math.random() * 9).toString();
        }
        return result;
    },
    create_identifier: function (length: number) {
        //const hex = this.make_hex_string_no_num(2).toString().toUpperCase();
        const number = this.make_number_string(length).toString();
        return "_" + number;
    },
    getMangledAt: function (iterations: number) {
        let mangledValue = '';

        while (iterations >= 0) {
            const remainder = iterations % 26;
            mangledValue = base[remainder] + mangledValue;
            iterations = Math.floor(iterations / 26) - 1;
        }
        return reserved.includes(mangledValue) ? "_" + mangledValue : mangledValue;
    },
    make_circle_string: function (index: number, length: number) {
        const characters = shuffleArray(['0', 'O']);
        let result = '';

        while (index > 0 || result.length < length) {
            const remainder = index % characters.length;
            result = characters[remainder] + result;
            index = Math.floor(index / characters.length);
        }

        while (result.length < length) {
            result = '0' + result;
        }

        return "O" + result;
    },
    make_barcode_string: function (index: number, length: number) {
        const characters = shuffleArray(['I', 'l']);
        let result = '';

        while (index > 0 || result.length < length) {
            const remainder = index % characters.length;
            result = characters[remainder] + result;
            index = Math.floor(index / characters.length);
        }

        return result;
    },
    make_hexadecimal_string: function (index: number, length: number) {
        const characters = shuffleArray([
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'A', 'B', 'C', 'D', 'E', 'F'
        ]);

        let result = '';

        while (result.length < length) {
            const remainder = index % characters.length;
            result = characters[remainder] + result;
            index = Math.floor(index / characters.length);
            index += characters.length * result.length;
        }

        return "_0x" + result;
    },
    make_large_string: function (index: number, length: number) {
        const characters = shuffleArray([
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J',
            'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T',
            'U', 'V', 'W', 'X', 'Y', 'Z',
            'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j',
            'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't',
            'u', 'v', 'w', 'x', 'y', 'z'
        ]);

        let result = '';

        while (result.length < length) {
            const remainder = index % characters.length;
            result = characters[remainder] + result;
            index = Math.floor(index / characters.length);
        }

        return "_" + result;
    },
    make_base64_string: function (index: number, length: number) {
        const characters = [] as any;

        for (let i = 256; i <= 300; i++) {
            characters.push(String.fromCharCode(i));
        }

        let result = '';

        while (index > 0) {
            const remainder = index % characters.length;
            result = characters[remainder] + result;
            index = Math.floor(index / characters.length);
        }

        return '_' + btoa(encodeURI(result));
    },
    make_money_string: function (index: number, length: number) {
        const characters = shuffleArray(["$", "_", "v", "V"]);

        let result = '';

        while (index > 0 || result.length < 4) {
            const remainder = index % characters.length;
            result = characters[remainder] + result;
            index = Math.floor(index / characters.length);
        }

        return result;
    },
    getMangled: function () {
        const ogIterations = iterations;
        let mangledValue = this.getMangledAt(iterations);
        iterations = ogIterations + 1;
        return mangledValue;
    },
    getIterations: function () {
        return iterations as any;
    },
}