'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Globe,
  KeyRound,
  Lock,
  Users,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const features = [
  {
    icon: Shield,
    title: 'JWT Authentication',
    description: 'Secure access and refresh token workflows.',
  },
  {
    icon: Globe,
    title: 'OAuth2 Login',
    description: 'Google, GitHub and enterprise providers.',
  },
  {
    icon: Users,
    title: 'RBAC',
    description: 'Fine-grained authorization and permissions.',
  },
  {
    icon: Lock,
    title: 'Endpoint Security',
    description: 'Protect APIs with Spring Security.',
  },
  {
    icon: KeyRound,
    title: 'Session Management',
    description: 'Track and manage active sessions.',
  },
  {
    icon: Zap,
    title: 'High Performance',
    description: 'Built for scale and modern architectures.',
  },
];

const stats = [
  {
    value: '50K+',
    label: 'Users',
  },
  {
    value: '5M+',
    label: 'Requests',
  },
  {
    value: '99.99%',
    label: 'Uptime',
  },
  {
    value: 'A+',
    label: 'Security',
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

const stagger = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export default function HomePage() {
  return (
    <div className='relative min-h-screen bg-background text-foreground overflow-hidden'>
      {/* Background */}
      <div className='absolute inset-0 -z-10'>
        <div
          className='
            absolute inset-0
            bg-[linear-gradient(to_right,hsl(var(--border)/0.25)_1px,transparent_1px),
            linear-gradient(to_bottom,hsl(var(--border)/0.25)_1px,transparent_1px)]
            bg-size-[55px_55px]
          '
        />

        <div className='absolute inset-x-0 top-0 h-125 bg-linear-to-b from-primary/10 to-transparent' />
      </div>

      {/* Hero */}
      <motion.section
        variants={fadeUp}
        initial='hidden'
        animate='show'
        className='container mx-auto px-6 pt-28 pb-24'
      >
        <div className='mx-auto max-w-4xl text-center'>
          <Badge variant='secondary' className='mb-6'>
            Secure Authentication Platform
          </Badge>

          <h1 className='text-5xl font-bold tracking-tight md:text-7xl'>
            Authentication
            <span className='block text-primary'>Built For Modern Apps</span>
          </h1>

          <p className='mx-auto mt-6 max-w-2xl text-lg text-muted-foreground'>
            JWT Authentication, OAuth2 Integration, Session Management and
            Role-Based Access Control for modern applications.
          </p>

          <div className='mt-10 flex flex-wrap justify-center gap-4'>
            <Button size='lg'>
              Get Started
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>

            <Button size='lg' variant='outline'>
              Documentation
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Stats */}
      <motion.section
        variants={fadeUp}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='container mx-auto px-6 pb-24'
      >
        <Card className='border-border bg-card/50 backdrop-blur-xl'>
          <CardContent className='grid gap-8 p-8 md:grid-cols-4'>
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className='text-sm text-muted-foreground'>{stat.label}</p>

                <h3 className='mt-2 text-3xl font-bold'>{stat.value}</h3>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.section>

      {/* Features */}
      <motion.section
        variants={stagger}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='container mx-auto px-6 py-24'
      >
        <div className='mb-16 text-center'>
          <Badge variant='outline'>Features</Badge>

          <h2 className='mt-4 text-4xl font-bold'>Everything You Need</h2>

          <p className='mt-4 text-muted-foreground'>
            Authentication and authorization tools built for scale.
          </p>
        </div>

        <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <motion.div key={feature.title} variants={fadeUp}>
                <Card
                  className='
                    h-full
                    border-border
                    bg-card/50
                    backdrop-blur-xl
                    transition-all
                    hover:-translate-y-1
                    hover:border-primary/30
                  '
                >
                  <CardContent className='p-6'>
                    <Icon className='mb-4 h-10 w-10 text-primary' />

                    <h3 className='text-xl font-semibold'>{feature.title}</h3>

                    <p className='mt-3 text-muted-foreground'>
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* Security */}
      <motion.section
        variants={fadeUp}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='container mx-auto px-6 py-24'
      >
        <Card className='border-border bg-card/50 backdrop-blur-xl'>
          <CardContent className='p-12 text-center'>
            <Shield className='mx-auto mb-6 h-14 w-14 text-primary' />

            <h2 className='text-4xl font-bold'>Security First</h2>

            <p className='mx-auto mt-4 max-w-2xl text-muted-foreground'>
              Built with modern authentication standards and enterprise security
              best practices.
            </p>

            <div className='mt-10 flex flex-wrap justify-center gap-3'>
              <Badge>JWT</Badge>
              <Badge>OAuth2</Badge>
              <Badge>RBAC</Badge>
              <Badge>Refresh Tokens</Badge>
              <Badge>Spring Security</Badge>
              <Badge>Session Tracking</Badge>
            </div>
          </CardContent>
        </Card>
      </motion.section>

      {/* CTA */}
      <motion.section
        variants={fadeUp}
        initial='hidden'
        whileInView='show'
        viewport={{ once: true }}
        className='container mx-auto px-6 py-24'
      >
        <Card className='border-border bg-card/50 backdrop-blur-xl'>
          <CardContent className='p-12 text-center md:p-20'>
            <h2 className='text-4xl font-bold md:text-6xl'>
              Ready To Secure
              <br />
              Your Application?
            </h2>

            <p className='mx-auto mt-6 max-w-2xl text-muted-foreground'>
              Start building with JWT, OAuth2, RBAC and enterprise-grade
              authentication today.
            </p>

            <Button size='lg' className='mt-10'>
              Get Started
              <ArrowRight className='ml-2 h-4 w-4' />
            </Button>
          </CardContent>
        </Card>
      </motion.section>
    </div>
  );
}
