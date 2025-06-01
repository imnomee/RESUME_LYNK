import moment from 'moment';
import html2canvas from 'html2canvas';

export const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
};

export const getLightColorFromImage = async (imageUrl) => {
    return new Promise((resolve, reject) => {
        if (!imageUrl || typeof imageUrl !== 'string') {
            return reject(new Error('Invalid image URL'));
        }
        const img = new Image();
        if (!imageUrl.startsWith('data:')) {
            img.crossOrigin = 'anonymous';
        }
        img.src = imageUrl;
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            const imageData = ctx.getImageData(
                0,
                0,
                canvas.width,
                canvas.height
            ).data;
            let r = 0,
                g = 0,
                b = 0,
                count = 0;
            for (let i = 0; i < imageData.length; i += 4) {
                const red = imageData[i];
                const green = imageData[i + 1];
                const blue = imageData[i + 2];
                const brightness = (red + green + blue) / 3;
                if (brightness > 100) {
                    r += red;
                    g += green;
                    b += blue;
                    count++;
                }
            }
            if (count === 0) {
                resolve('#fff');
            } else {
                r = Math.round(r / count);
                g = Math.round(g / count);
                b = Math.round(b / count);
                resolve(`rgb(${r}, ${g}, ${b})`);
            }
        };
        img.onerror = (error) => {
            reject(error);
        };
    });
};

export const formatYearMonth = (yearMonth) => {
    return yearMonth ? moment(yearMonth, 'YYYY-MM').format('MMMM YYYY') : '';
};

export const fixTailwindColors = (element) => {
    const elements = element.querySelectorAll('*');
    elements.forEach((el) => {
        const style = window.getComputedStyle(el);

        ['color', 'backgroundColor', 'borderColor'].forEach((property) => {
            const value = style[property];
            if (value.includes('oklch')) {
                el.style[property] = '#000';
            }
        });
    });
};

export async function captureElementAsImage(element) {
    if (!element) throw new Error('No Element provided');
    const canvas = await html2canvas(element);
    return canvas.toDataURL('image/png');
}

export const dataURLtoFile = (dataUrl, fileName) => {
    const arr = dataUrl.split(',');
    const mime = arr[0].match(/:[.*?];/[1]);
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], fileName, { type: mime });
};
