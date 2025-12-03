import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "../css/Community.css";
import {Eye ,MessageCircle, Heart} from 'lucide-react'

export function Community () {
    
    const Community = {
        category: "전문가에게 묻다",
        title: "커뮤니티 이런 제목",
        content: "어쩌구가 저쩌구가 저쩌구가 저쩌구고 어쩌구리",
        writerNickName: "김아무개",
        view: 7,
        comments: 14
    };

    return (
        <a href="#" className="Com-card">

            <div className="Com-infoBox">
            <div className="Com-info">
                <span className="Com-category">{Community.category}</span>
                <div className="Com-title">{Community.title}</div>
                <span className="Com-content">{Community.content}</span>
            </div>
            <div className="Com-reaction">
                <span className="Com-writer">{Community.writerNickName}</span>
                <i className="bi bi-dot dot"></i>
                <div className="favs"><Eye size={15}/>{Community.view}</div>
                <i className="bi bi-dot dot"></i>
                <div className="chats"><MessageCircle size={15}/>{Community.comments}</div>
                <i className="bi bi-dot dot"></i>
                <div className="favs"><Heart size={17}/>12</div>
            </div>
            </div>
            
             <div className="Com-image">
            </div>
        </a>
    );
}