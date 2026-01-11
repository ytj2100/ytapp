// lib/db.ts
import { PrismaClient } from '@prisma/client';
import { format } from 'sql-formatter';
import chalk from 'chalk';

// PrismaClient 전역 객체 타입 정의
const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Prisma 클라이언트 생성 함수
const prismaClientSingleton = () => {
  const client = new PrismaClient({
    log: [
      { emit: 'event', level: 'query' }, // 1. 로그를 stdout이 아닌 event로 받겠다고 설정
      { emit: 'stdout', level: 'error' },
      { emit: 'stdout', level: 'info' },
      { emit: 'stdout', level: 'warn' },
    ],
  });

  // 2. 쿼리 이벤트 리스너 등록
  // @ts-ignore (Prisma 타입 정의 이슈 무시)
  client.$on('query', (e: any) => {
    const formattedQuery = format(e.query, {
      language: 'sqlite', // 사용하는 DB에 맞춰 설정 (postgresql, mysql 등)
      tabWidth: 2,        // 들여쓰기 간격
      keywordCase: 'upper', // 예약어 대문자 (SELECT, FROM ...)
    });

    console.log(chalk.blue('┌─────────────────────────────────────────────────────────┐'));
    console.log(`${chalk.blue('│')} ${chalk.yellow('Time:')} ${e.timestamp}  ${chalk.magenta('Duration:')} ${e.duration}ms`);
    console.log(chalk.blue('├─────────────────────────────────────────────────────────┤'));
    console.log(chalk.green(formattedQuery));
    console.log(chalk.blue('├─────────────────────────────────────────────────────────┤'));
    console.log(`${chalk.blue('│')} ${chalk.cyan('Params:')} ${e.params}`);
    console.log(chalk.blue('└─────────────────────────────────────────────────────────┘'));
  });

  return client;
};

// 3. 싱글톤 패턴 적용 (개발 환경에서 인스턴스 중복 방지)
export const prisma = globalForPrisma.prisma || prismaClientSingleton();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;