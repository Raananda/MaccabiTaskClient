import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-type': 'application/json',
        'Authorization': 'my-auth-token'
    })
}

@Injectable({
    providedIn: 'root'
})
export class VideosService {


    constructor(private http: HttpClient) { }


    GetAllVideos(): Observable<any> {
        return this.http.get<any>("api/VideoLinks")
            .pipe(
                catchError(this.handleError)
            );
    }

    PostVideoLink(data: any): Observable<any> {
        return this.http.post<any>("api/VideoLinks", data, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    PutVideoLink(data: any): Observable<any> {
        return this.http.put<any>("api/VideoLinks", data, httpOptions)
            .pipe(
                catchError(this.handleError)
            );
    }

    deleteVideoLink(id: string): Observable<unknown> {
        const url = `api/VideoLinks?id=${id}`; 
        return this.http.delete(url, httpOptions)
          .pipe(
            catchError(this.handleError)
          );
      }
    private handleError(error: HttpErrorResponse) {
        if (error.status === 0) {
            // A client-side or network error occurred. Handle it accordingly.
            console.error('An error occurred:', error.error);
        } else {
            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, body was: `, error.error);
        }
        // Return an observable with a user-facing error message.
        return throwError(
            error.error);
    }
}
