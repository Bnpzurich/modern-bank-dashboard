
export interface Account {
  id: string;
  type: 'current' | 'savings' | 'credit';
  name: string;
  balance: number;
  currency: string;
  cardNumber?: string;
  interestRate?: number;
  availableCredit?: number;
}

export interface Transaction {
  id: string;
  type: 'deposit' | 'withdrawal' | 'shopping' | 'rent' | 'food' | 'transport' | 'utilities' | 'gift' | 'card';
  title: string;
  date: string;
  amount: number;
  currency: string;
  accountId: string;
}

export interface Beneficiary {
  id: string;
  name: string;
  accountNumber: string;
  bank: string;
  lastUsed?: string;
}

// Mock Accounts
export const accounts: Account[] = [
  {
    id: 'acc-1',
    type: 'current',
    name: 'Compte Courant Principal',
    balance: 2574.53,
    currency: 'EUR',
    cardNumber: '4539 **** **** 8241',
  },
  {
    id: 'acc-2',
    type: 'savings',
    name: 'Livret A',
    balance: 15680.75,
    currency: 'EUR',
    interestRate: 3.0,
  },
  {
    id: 'acc-3',
    type: 'credit',
    name: 'Carte Visa Premier',
    balance: -357.82,
    currency: 'EUR',
    cardNumber: '4916 **** **** 3824',
    availableCredit: 4642.18,
  },
];

// Mock Transactions
export const transactions: Transaction[] = [
  {
    id: 'tx-1',
    type: 'deposit',
    title: 'Salaire Mars 2024',
    date: '2 avril 2024',
    amount: 2450.00,
    currency: 'EUR',
    accountId: 'acc-1',
  },
  {
    id: 'tx-2',
    type: 'rent',
    title: 'Loyer Avril',
    date: '1 avril 2024',
    amount: -850.00,
    currency: 'EUR',
    accountId: 'acc-1',
  },
  {
    id: 'tx-3',
    type: 'shopping',
    title: 'Carrefour',
    date: '31 mars 2024',
    amount: -78.35,
    currency: 'EUR',
    accountId: 'acc-1',
  },
  {
    id: 'tx-4',
    type: 'food',
    title: 'Restaurant Le Bistrot',
    date: '30 mars 2024',
    amount: -42.50,
    currency: 'EUR',
    accountId: 'acc-1',
  },
  {
    id: 'tx-5',
    type: 'transport',
    title: 'SNCF',
    date: '29 mars 2024',
    amount: -37.00,
    currency: 'EUR',
    accountId: 'acc-1',
  },
  {
    id: 'tx-6',
    type: 'utilities',
    title: 'EDF Electricité',
    date: '28 mars 2024',
    amount: -87.45,
    currency: 'EUR',
    accountId: 'acc-1',
  },
  {
    id: 'tx-7',
    type: 'withdrawal',
    title: 'Retrait DAB',
    date: '27 mars 2024',
    amount: -60.00,
    currency: 'EUR',
    accountId: 'acc-1',
  },
  {
    id: 'tx-8',
    type: 'deposit',
    title: 'Remboursement Julie',
    date: '26 mars 2024',
    amount: 25.00,
    currency: 'EUR',
    accountId: 'acc-1',
  },
];

// Mock Beneficiaries
export const beneficiaries: Beneficiary[] = [
  {
    id: 'ben-1',
    name: 'Thomas Martin',
    accountNumber: 'FR76 3000 4000 0100 0245 6334 259',
    bank: 'BNP Paribas',
    lastUsed: '15 mars 2024',
  },
  {
    id: 'ben-2',
    name: 'Sophie Durand',
    accountNumber: 'FR76 1234 5678 9101 2345 6789 101',
    bank: 'Société Générale',
    lastUsed: '27 février 2024',
  },
  {
    id: 'ben-3',
    name: 'Marc Dubois',
    accountNumber: 'FR76 5678 9101 2345 6789 1012 345',
    bank: 'Crédit Agricole',
  },
  {
    id: 'ben-4',
    name: 'Appartement Paris',
    accountNumber: 'FR76 9101 2345 6789 1012 3456 789',
    bank: 'La Banque Postale',
    lastUsed: '1 avril 2024',
  },
];

// Function to get recent transactions
export const getRecentTransactions = (accountId?: string, limit = 5): Transaction[] => {
  if (accountId) {
    return transactions
      .filter(tx => tx.accountId === accountId)
      .slice(0, limit);
  }
  
  return transactions.slice(0, limit);
};

// Function to get account by ID
export const getAccountById = (accountId: string): Account | undefined => {
  return accounts.find(acc => acc.id === accountId);
};

// Function to get total balance across all accounts
export const getTotalBalance = (): number => {
  return accounts.reduce((total, account) => total + account.balance, 0);
};

// Function to get income and expenses for the current month
export const getCurrentMonthStats = () => {
  const income = transactions
    .filter(tx => tx.type === 'deposit')
    .reduce((total, tx) => total + tx.amount, 0);
    
  const expenses = transactions
    .filter(tx => tx.amount < 0)
    .reduce((total, tx) => total + Math.abs(tx.amount), 0);
    
  return { income, expenses };
};
