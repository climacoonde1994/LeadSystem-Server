class SecurityDto {
    
    IsAuthenticated = true;
    User = new  userDto();
    Pagination = new PaginationDto();
    constructor(user,pagination) 
    {
        this.Pagination = user
        this.Pagination = pagination
    }
}