"use client";

import React from "react";
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, useTheme, Chip } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const SheetCard = styled(Box)(({ theme }) => ({
  borderRadius: 16,
  border: `1px solid ${alpha(theme.palette.divider, 0.7)}`,
  background: theme.palette.background.paper,
  overflow: "hidden",
  boxShadow: `0 2px 8px ${alpha(theme.palette.common.black, 0.05)}`,
}));

export default function ExcelPreview({ sheets, onSheetIndexChange, activeIndex, themeMode }) {
  const theme = useTheme();

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          Swipe to preview sheets
        </Typography>
        <Chip 
          label={`${sheets.length} Sheet${sheets.length !== 1 ? 's' : ''}`} 
          size="small" 
          color="primary" 
          variant="outlined"
        />
      </Box>
      
      <Swiper
        modules={[Pagination]}
        spaceBetween={12}
        slidesPerView={1}
        pagination={{ clickable: true }}
        onSlideChange={(s) => onSheetIndexChange?.(s.activeIndex)}
        initialSlide={activeIndex || 0}
      >
        {sheets.map((sheet, idx) => {
          const totalRows = sheet.rows?.length || 0;
          const displayRows = sheet.rows?.slice(0, 100) || []; // Show first 100 for preview
          
          return (
            <SwiperSlide key={idx}>
              <SheetCard>
                <Box
                  sx={{
                    px: 2,
                    py: 1.5,
                    bgcolor: alpha(theme.palette.primary.main, 0.08),
                    borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.15)}`,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography variant="subtitle1" fontWeight={700}>
                    {sheet.name || `Sheet ${idx + 1}`}
                  </Typography>
                  <Chip 
                    label={`${totalRows} rows`}
                    size="small"
                    sx={{ 
                      bgcolor: alpha(theme.palette.primary.main, 0.1),
                      fontWeight: 600,
                      fontSize: '0.75rem'
                    }}
                  />
                </Box>

                <Box sx={{ overflow: "auto", maxHeight: 500 }}>
                  <Table size="small" stickyHeader>
                    {displayRows.length ? (
                      <>
                        <TableHead>
                          <TableRow>
                            {(displayRows[0] || []).map((h, i) => (
                              <TableCell 
                                key={i} 
                                sx={{ 
                                  fontWeight: 700,
                                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {String(h || `Col ${i + 1}`)}
                              </TableCell>
                            ))}
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {displayRows.slice(1).map((row, rIdx) => (
                            <TableRow key={rIdx} hover>
                              {(displayRows[0] || []).map((_, cIdx) => (
                                <TableCell key={cIdx}>
                                  {String(row[cIdx] ?? "")}
                                </TableCell>
                              ))}
                            </TableRow>
                          ))}
                        </TableBody>
                      </>
                    ) : (
                      <TableBody>
                        <TableRow>
                          <TableCell align="center" sx={{ py: 4 }}>
                            <Typography color="text.secondary">No data in this sheet</Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    )}
                  </Table>
                </Box>

                {totalRows > 100 && (
                  <Box 
                    sx={{ 
                      px: 2, 
                      py: 1, 
                      bgcolor: alpha(theme.palette.warning.main, 0.05),
                      borderTop: `1px solid ${alpha(theme.palette.warning.main, 0.2)}`
                    }}
                  >
                    <Typography variant="caption" color="warning.main" fontWeight={600}>
                      Preview shows first 100 rows. All {totalRows} rows will be included in PDF.
                    </Typography>
                  </Box>
                )}
              </SheetCard>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Box>
  );
}