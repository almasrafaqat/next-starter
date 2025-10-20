"use client";

import React from "react";
import Link from "next/link";
import {
  Box,
  Container,
  Grid,
  Typography,
  Button,
  Stack,
  Chip,
  TextField,
  FormControlLabel,
  Checkbox,
  Alert,
  LinearProgress,
  Divider,
  Paper,
} from "@mui/material";
import {
  ReceiptLong,
  Send,
  BrandingWatermark,
  LocalOffer,
  PriceChange,
  RequestQuote,
  AssignmentTurnedIn,
  LocalShipping,
  Payments,
  AccessTime,
  Campaign,
  WhatsApp,
  Email,
  AutoAwesome,
  Shield,
} from "@mui/icons-material";
import { alpha, useTheme } from "@mui/material/styles";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  SectionWrap,
  HeroWrap,
  Badge,
  Glow,
  FeatureCard,
  IconCircle,
  MiniInvoice,
  TotalsRow,
  StatusPill,
  FormCard,
  SwiperWrap,
} from "./InvoiceSuite.styles";

const FORMPRESS_ENDPOINT =
  process.env.NEXT_PUBLIC_FORMPRESS_ENDPOINT; // e.g. https://formspree.io/f/xxxxx

export default function InvoiceSuite() {
  const theme = useTheme();
  const [sending, setSending] = React.useState(false);
  const [ok, setOk] = React.useState(false);
  const [err, setErr] = React.useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setErr("");
    setOk(false);

    try {
      if (!FORMPRESS_ENDPOINT) throw new Error("Form endpoint is not configured");

      const form = e.currentTarget;
      const data = new FormData(form);

      const res = await fetch(FORMPRESS_ENDPOINT, {
        method: "POST",
        body: data,
        headers: {
          // Important for Formspree/Formpress: prevents redirect to /thanks
          Accept: "application/json",
        },
      });

      // Some providers may still return opaque redirect; treat as success
      if (res.type === "opaqueredirect") {
        setOk(true);
        form.reset();
        return;
      }

      if (!res.ok) {
        let message = "Submission failed";
        try {
          const json = await res.json();
          if (json?.errors?.length) {
            message = json.errors.map((e) => e.message).join(", ");
          }
        } catch {}
        throw new Error(message);
      }

      // JSON success
      setOk(true);
      form.reset();
    } catch (error) {
      setErr(error.message || "Something went wrong");
    } finally {
      setSending(false);
    }
  };

  const features = [
    { icon: <ReceiptLong />, title: "Generate invoices", desc: "Create branded invoices in seconds." },
    { icon: <BrandingWatermark />, title: "Custom branding", desc: "Logo, colors, templates, domains." },
    { icon: <LocalOffer />, title: "Discounts", desc: "Item‑level and invoice‑level discounts." },
    { icon: <PriceChange />, title: "Taxes", desc: "Flexible multi‑rate taxes." },
    { icon: <AssignmentTurnedIn />, title: "Statuses", desc: "Draft, processing, shipped, completed." },
    { icon: <Payments />, title: "Payments", desc: "Track paid, partial, due, and write‑offs." },
    { icon: <AccessTime />, title: "Deadlines", desc: "Due dates, reminders, expiries." },
    { icon: <Send />, title: "Send & share", desc: "Email, link, PDF, WhatsApp share." },
    { icon: <Campaign />, title: "Campaigns", desc: "Email + WhatsApp follow‑ups." },
    { icon: <RequestQuote />, title: "Quotes to invoice", desc: "One‑click quote → invoice." },
    { icon: <Email />, title: "Smart reminders", desc: "Automated dunning with schedule." },
    { icon: <Shield />, title: "Audit & logs", desc: "Full history and activity tracking." },
  ];

  return (
    <SectionWrap>
      <Glow />
      <HeroWrap>
        <Container >
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Badge>Pro Invoice Suite</Badge>
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: 28, sm: 36, md: 44 },
                fontWeight: 900,
                letterSpacing: -0.8,
                background: `linear-gradient(135deg, ${theme.palette.text.primary}, ${alpha(
                  theme.palette.text.primary,
                  0.6
                )})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Generate. Send. Get Paid. Manage at scale.
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 760 }}
            >
              Enterprise‑grade invoicing with discounts, item‑level taxes,
              statuses, payment tracking, delivery timelines, and automated
              reminders. Built for teams that care about speed and accuracy.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                variant="contained"
                size="large"
                onClick={() =>
                  document
                    .getElementById("invoice-contact")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" })
                }
                sx={{ fontWeight: 800, textTransform: "none" }}
              >
                Get a demo
              </Button>
              <Button
                component={Link}
                href="/en/tools/doctopdf"
                size="large"
                sx={{ fontWeight: 800, textTransform: "none" }}
              >
                Explore tools
              </Button>
            </Stack>
            <Stack direction="row" spacing={1} sx={{ mt: 1 }} flexWrap="wrap" justifyContent="center">
              <StatusPill color="success">Paid</StatusPill>
              <StatusPill color="warning">Processing</StatusPill>
              <StatusPill color="info">Shipped</StatusPill>
              <StatusPill color="error">Overdue</StatusPill>
            </Stack>
          </Stack>

          <Grid container spacing={3} sx={{ mt: { xs: 3, md: 6 } }}>
            <Grid item xs={12} md={7.5}>
              <SwiperWrap>
                <Swiper
                  modules={[Pagination, Autoplay]}
                  grabCursor
                  watchOverflow
                  slidesPerView={1.05}         // show a slight peek on mobile
                  spaceBetween={12}
                  centeredSlides={false}
                  pagination={{ clickable: true }}
                  autoplay={{ delay: 3500, disableOnInteraction: false }}
                  loop={false}                  // avoid cloned slides overlapping columns
                  breakpoints={{
                    0:   { slidesPerView: 1.05, spaceBetween: 12 },
                    600: { slidesPerView: 2,    spaceBetween: 12 },
                    900: { slidesPerView: 2,    spaceBetween: 14 },
                    1200:{ slidesPerView: 3,    spaceBetween: 16 },
                  }}
                >
                  {features.map((f, i) => (
                    <SwiperSlide key={i}>
                      <FeatureCard>
                        <IconCircle>{f.icon}</IconCircle>
                        <Typography variant="subtitle1" fontWeight={800}>
                          {f.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {f.desc}
                        </Typography>
                      </FeatureCard>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </SwiperWrap>
            </Grid>

            <Grid item xs={12} md={4.5}>
              <MiniInvoice elevation={0}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography variant="subtitle1" fontWeight={800}>Aurora Outfitters</Typography>
                  <Chip color="success" size="small" label="Paid • INV-1042" />
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={1}>
                  {[
                    { name: "Pro Jersey", qty: 10, price: 25.0, tax: "8%" },
                    { name: "Custom Shorts", qty: 10, price: 15.0, tax: "8%" },
                    { name: "Shipping", qty: 1, price: 18.0, tax: "0%" },
                  ].map((row, idx) => (
                    <Stack key={idx} direction="row" justifyContent="space-between">
                      <Typography fontWeight={700}>{row.name}</Typography>
                      <Typography color="text.secondary">
                        x{row.qty} • ${row.price.toFixed(2)} • Tax {row.tax}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                <TotalsRow>
                  <Typography color="text.secondary">Subtotal</Typography>
                  <Typography>$418.00</Typography>
                </TotalsRow>
                <TotalsRow>
                  <Typography color="text.secondary">Discount</Typography>
                  <Typography>−$20.00</Typography>
                </TotalsRow>
                <TotalsRow>
                  <Typography color="text.secondary">Tax</Typography>
                  <Typography>$31.84</Typography>
                </TotalsRow>
                <TotalsRow bold>
                  <Typography>Total</Typography>
                  <Typography>$429.84</Typography>
                </TotalsRow>

                <Paper
                  variant="outlined"
                  sx={{
                    mt: 2,
                    p: 1.25,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    bgcolor: alpha(theme.palette.success.main, 0.06),
                    borderColor: alpha(theme.palette.success.main, 0.2),
                  }}
                >
                  <Payments fontSize="small" color="success" />
                  <Typography variant="body2">
                    Paid $429.84 • Remaining $0.00 • Due 0d
                  </Typography>
                </Paper>

                <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                  <Chip icon={<Email />} label="Email sent" size="small" />
                  <Chip icon={<WhatsApp />} label="WhatsApp" size="small" />
                  <Chip icon={<Campaign />} label="Reminder scheduled" size="small" />
                </Stack>
              </MiniInvoice>
            </Grid>
          </Grid>
        </Container>
      </HeroWrap>

      <Container id="invoice-contact" maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 900, mb: 1 }}>
              Talk to our team
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 2 }}>
              Tell us about your invoicing workflow. We’ll set up a tailored demo and pricing.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 2 }} flexWrap="wrap">
              <Chip icon={<AutoAwesome />} label="Unlimited items" />
              <Chip icon={<Send />} label="One‑click send" />
              <Chip icon={<AccessTime />} label="Auto reminders" />
              <Chip icon={<Campaign />} label="Email & WhatsApp" />
            </Stack>
          </Grid>

          <Grid item xs={12} md={6}>
            <FormCard>
              <form onSubmit={onSubmit}>
                <input type="hidden" name="_fp" value="invoice-suite" />
                <Stack spacing={1.25}>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                    <TextField name="name" label="Full name" fullWidth required />
                    <TextField name="company" label="Company" fullWidth />
                  </Stack>
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                    <TextField name="email" type="email" label="Work email" fullWidth required />
                    <TextField name="phone" type="tel" label="Phone" fullWidth />
                  </Stack>
                  <TextField name="message" label="What are you looking to solve?" multiline minRows={3} />
                  <Stack direction="row" spacing={2} flexWrap="wrap">
                    <FormControlLabel control={<Checkbox name="interest_invoices" />} label="Invoices" />
                    <FormControlLabel control={<Checkbox name="interest_quotes" />} label="Quotes" />
                    <FormControlLabel control={<Checkbox name="interest_campaigns" />} label="Campaigns" />
                    <FormControlLabel control={<Checkbox name="interest_whatsapp" />} label="WhatsApp" />
                  </Stack>

                  {sending && <LinearProgress sx={{ borderRadius: 1 }} />}

                  {ok && (
                    <Alert severity="success">Thanks! We will reach out shortly.</Alert>
                  )}
                  {err && <Alert severity="error">{err}</Alert>}

                  <Stack direction={{ xs: "column", sm: "row" }} spacing={1.25}>
                    <Button
                      type="submit"
                      variant="contained"
                      size="large"
                      disabled={sending}
                      sx={{ fontWeight: 800, textTransform: "none", flex: 1 }}
                    >
                      Request demo
                    </Button>
                    <Button
                      size="large"
                      disabled={sending}
                      component={Link}
                      href="#"
                      target="_blank"
                      sx={{ fontWeight: 800, textTransform: "none", flex: 1 }}
                    >
                      Learn more
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </FormCard>
          </Grid>
        </Grid>
      </Container>
    </SectionWrap>
  );
}