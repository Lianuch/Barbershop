export type Favors={
    _id: string,
    time: string,
    price: number,
    favorTranslations:{
        _id: string,
        language: string,
        name:string,   
    }[]
} 