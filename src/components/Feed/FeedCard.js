import React from 'react'

export default function () {
    return (
        <div> 


            <div>
                <div className="card text-bg-primary mb-3" style={{ maxWidth: '18rem' }}>
                    <div className="card-header">오늘의 날씨 (2023.5.19)</div>
                    <div className="card-body">
                        <h5 className="card-title">최고기온 27도 / 최저기온 16도</h5>
                        <p className="card-text">
                            자외선수치가 높으니 <br />
                            야외활동 시 강한 햇빛에 <br />
                            장시간 노출되지 않도록 주의하세요. <br />
                            <br />
                            기상캐스터 박연진이었습니다.
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <div className="card text-bg-danger mb-3" style={{ maxWidth: '18rem' }}>
                    <div className="card-header">최근 인기 채용 공고</div>
                    <div className="card-body">
                        <h5 className="card-title">슈의 라면가게 </h5>
                        <p className="card-text">
                            근무지역 : 고척스카이돔 1F <br />
                            근무기간 : 6개월 <br />
                            근무시간 : 18시 ~ 익일 18시 <br />
                            근무형태 : 정규직 <br />
                            주 업무 : 라면 조리
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <div className="card text-bg-secondary mb-3 " style={{ maxWidth: '18rem' }}>
                    <div className="card-header">정보처리기사 기출문제 공유</div>
                    <div className="card-body">
                        <h5 className="card-title">모두 좋은 결과 얻으시길 바랍니다.</h5>
                        <p className="card-text">
                            댓글로 메일 남겨주시면 <br />
                            파일 공유드리겠습니다~
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <div className="card text-bg-warning mb-3" style={{ maxWidth: '18rem' }}>
                    <div className="card-header">Weekly Hot</div>
                    <div className="card-body">
                        <h5 className="card-title">이 주의 인기 게시글</h5>
                        <p className="card-text">
                           1. 독산 캠퍼스 구내 식당 메뉴.pdf <br/>
                           2. 휴가신청서 양식.hwp <br />
                           3. 비콘 출석이 안되는데 저만 이럼?
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <div className="card text-bg-info mb-3" style={{ maxWidth: '18rem' }}>
                    <div className="card-header">캠퍼스 이용시간 안내</div>
                    <div className="card-body">
                        <h5 className="card-title">독산캠퍼스</h5>
                        <p className="card-text">
                            오전 9시 ~  오후 21시
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <div className="card text-bg-light mb-3" style={{ maxWidth: '18rem' }}>
                    <div className="card-header">제작자</div>
                    <div className="card-body">
                        <h5 className="card-title">남민우만나고피시방에<br/>5만원쓸수있어서R&D</h5>
                        <p className="card-text">
                            남정현 : 팀장 <br />
                            권광일 : 대리 <br />
                            김희주 : 사원 <br />
                            김용호 : 인턴 <br />
                            남민우 : 인턴 <br />
                            유수빈 : 신입 (정규직) <br />
                        </p>
                    </div>
                </div>
            </div>


        </div> // 마지막 div
    )
}
