import axios from 'axios';
import storejs from 'storejs';
import moduleEvent from '@/event/moduleEvent';

export const exportCommon = (exportUrl, params) => {
    moduleEvent.$emit('actionload',true)
    let paramsList = []
    
    Object.keys(params).forEach((key) => {
        if (params[key] !== '' && params[key] !== undefined && params[key] !== null) paramsList.push(`${key}=${params[key]}`)
    })
    exportUrl = exportUrl + '?' + paramsList.join('&')

    return new Promise((resolve, reject) => {
        var token = storejs("token")

        axios({
            method: "get",
            url: '/b2b/' + exportUrl,
            headers: {
                token: token
            },
            data: {},
            responseType: "blob"
        }).then(blob => {
            const a = document.createElement("a");
            const url = window.URL.createObjectURL(blob.data);
            const filename = decodeURI(
                blob.headers["content-disposition"].split(";")[1].split("=")[1]
            );
            a.href = url;
            a.download = filename;
            a.click();
            window.URL.revokeObjectURL(url);
            moduleEvent.$emit('actionload',false)
            resolve()
        }).catch(err => {
            reject('操作失败')
        })
    })
}
export const provinces = () => {
    return new Promise((resolve, reject) => {
        axios.get(
            "http://s3.jzez100.com/s2/4/06/d7/2d92625d782402ef191eaed5a96b6ca06ad11f9e60fc619101d26d6ab0c.json"
        ).then(
            resolve(res.data)
        ).catch(err => {
            reject('操作失败')
        })
    })
    
}