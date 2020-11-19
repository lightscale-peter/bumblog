import React, { useCallback, useEffect, useState } from 'react';
import BoardList from './BoardList';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {BsPencilSquare} from 'react-icons/bs';
import { gql, useQuery } from '@apollo/client';

export type boardListType = {
    id: string;
    tags: string;
    title: string;
    description: string;
    user: {
        name: string;
    }
    t_originalName: string;
    t_fileName: string;
    boardImages: boardImagesType[];
}
export type boardImagesType = {
    originalname: string;
    filename: string;
}

const GET_LISTS = gql`
    query GetBoardList($target: String!, $word: String!, $limit: Int!) {
        boardLists(target: $target, word: $word, limit: $limit){
            id
            title
            tags
            createdAt
            t_fileName
            t_originalName
            user{
                name
            }
            boardImages{
                originalName
                fileName
            }
        }
    }
`;


function BoardHome(){
    const {loading, data} = useQuery(GET_LISTS, {
        variables: {
            target: "title",
            word: "블로그",
            limit: 10
        }
    });
    const [boardList, setBoardList] = useState<boardListType[]>([]);
    console.log('data', data);

    const activateTagButton = (e:React.MouseEvent<HTMLLIElement, MouseEvent>) =>{
        document.querySelectorAll('.bb-board-home__tags-ul > li').forEach((list)=>{
            list.classList.remove('on');
        });
        e.currentTarget.classList.add('on');

        console.log('e.currentTarget', e.currentTarget.innerText);
        console.log('boardList', boardList);
    }

    useEffect(()=>{
        if(!loading){
            // setBoardList(data.boardLists)
        }
    }, [loading])

    useEffect(()=>{
        window.scrollTo(0, 0);
    }, []);


    return (
        <main className="bb-board-home__main">
            <section className="bb-board-home__hero-section">
                <div>
                    <h1>Bumblog</h1>
                    <div className="bb-board-home__hero-desc">
                        생각나는 것을 기록하고 저장하는 공간
                    </div>
                </div>
            </section>
            <section className="bb-board-home__tags-section">
                <div>
                    <ul className="bb-board-home__tags-ul">
                        <li className="on" onClick={activateTagButton}>모두</li>
                        <li onClick={activateTagButton}>개발</li>
                        <li onClick={activateTagButton}>공부</li>
                        <li onClick={activateTagButton}>생각</li>
                    </ul>
                </div>
            </section>
            <section className="bb-board-home__write-button-section">
                <div className="bb-board-home__btns-wrapper">
                    <div>&nbsp;</div>
                    <div>
                        <Link className="bb-board-home__icon-wrapper" to="/board/write">
                            <BsPencilSquare className="bb-board-home__write-icon" />&nbsp;글쓰기
                        </Link>
                    </div>
                </div>
            </section>
            <section className="bb-board-home__list-section">
                <ul className="bb-board-home__list-ul-tag">
                    {boardList.map(list => <BoardList key={list.id} data={list} />)}
                </ul>
            </section>
            
        </main>
    )
}

export default BoardHome;