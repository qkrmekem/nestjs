// model : 스프링에서 domain
/* before typeorm
export interface Board{
    id: string,
    title: string,
    description: string,
    // 게시글이 공개인지 비공개인지
    // enum으로 정의
    status: BoardStatus
}
*/
export enum BoardStatus{
    PUBLIC = 'PUBLIC',
    PRIVATE = 'PRIVATE'
}