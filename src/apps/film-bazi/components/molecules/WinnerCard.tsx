import React from "react";
import { Container, Box, Typography,  } from "@mui/material";
import starIcon from "../../assets/starIcon.svg";
import { toPersianNumber } from 'commons/utils/translateNumber';
import { ScoreBoardItemType } from "apps/film-bazi/types";

interface WinnerScore{
	rank: number,
	score: number
}

const WinnerCard:  React.FC<WinnerScore> = ({rank, score}) => {
    const conditionalHeight = rank === 1 ? "198px" : rank === 2 ? "120px" : "58px";
    const conditionalMargin = rank === 1 ? "0px" : rank === 2 ? "78px" : "140px"; 
    const conditionalColor = rank === 1? "#d9c66a" : rank === 2 ? "#686868" : "#853414";
    const conditionalRectaangleColor = rank === 1 ? "linear-gradient(360deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 205, 32, 0.3) 100%)" : rank === 2 ? "linear-gradient(360deg, rgba(255, 255, 255, 0.03) 0%, rgba(185, 230, 30, 0.3) 100%)" : "linear-gradient(360deg, rgba(255, 255, 255, 0.03) 0%, rgba(235, 92, 36, 0.3) 100%);";

    return (
        <Container 
            sx={{  
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                width: "30%"
            }}
        >
            <Box 
                sx={{ 
                    width: "60.52px",
                    height: "60.52px",
                    gap: "0px",
                    border: "1.5px", 
                    borderRadius: '50%', 
                    backgroundColor: conditionalColor,
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    marginBottom: 2,
                    marginTop: conditionalMargin,
                }}
            >
                <Box 
                    component="img"
                    src={starIcon}
                    sx={{
                        width: "35.4px",
                        height: "34.26px",
                        top: "12.56px",
                        left: "50.13px",
                        border: "1.5px",
                    }}
                />
            </Box>
            <Typography 
                sx={{ 
                    marginBottom: 2,
                    fontSize: "16px",
                    fontWeight: "600",
                    lineHeight: "24px",
                    textAlign: "center",
                    color: conditionalColor
                }}
            >
                {toPersianNumber(score)}
            </Typography>
            <Box 
                sx={{ 
                    width:{
                        md: "135.67px",
                        xs: "100px"
                    },
                    height: conditionalHeight,
                    borderRadius: "10px 10px 0px 0px",
                    background: conditionalRectaangleColor
                }} 
            />
        </Container>
    );  
}

export default WinnerCard;