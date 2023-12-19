

export default function zeroLeft (n:number){
    return Math.floor(n).toString().padStart(2, '00')
}