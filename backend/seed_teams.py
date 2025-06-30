# seed_teams.py
import random
from datetime import datetime
from sqlmodel import Session
from db.init_db import engine
from models.team import Team  # Make sure Team is imported correctly
from uuid import UUID

# Define your manager and user UUIDs

manager_ids = [
    UUID("b26c97f8-6a44-40c0-bd7f-8e554d58dfa8"),
    UUID("58f44e7f-9ec3-4b59-b066-0539354c270c"),
    UUID("d0e4f203-d4fb-4a44-b303-b8cb4f395e5d"),
    UUID("3ce44f5f-4007-4252-8383-e410f07e1045"),
    UUID("4cb9ab02-2ace-404a-9231-e4843af69b9c"),
    UUID("6716c12c-f5c2-4d1b-9b39-8ce38f80d666"),
]

all_user_ids = [
    UUID("7c99f527-0f8a-48f9-b2c1-8f0d3925c3c9"),
    UUID("dfed693a-6621-4884-b5b3-f7137b36ca2a"),
    UUID("777802cd-a9b8-4482-bc9d-2fa48e930d01"),
    UUID("35eadf5c-2f9d-4ed1-91b7-d9de628ac715"),
    UUID("bce5e57b-20b1-418d-a833-9f2bb03c67b8"),
    UUID("b3fa76e5-d9a6-4a9c-80c9-9969a996d625"),
    UUID("679bad3e-3e5a-43c5-be95-189d62cb8939"),
    UUID("05942bea-c01b-42cb-9816-a884b08a4974"),
    UUID("86225da8-679d-461c-91b5-a32dd5a46da7"),
    UUID("366ae742-d8e4-4c4c-8de3-63125cabdc7a"),
    UUID("e6e1e32d-8711-4f8f-be40-e66c04dd5b07"),
    UUID("cb7c375b-6822-4658-8209-94481a3652e4"),
    UUID("4de0b210-9a7d-430f-91fe-28952b03375d"),
    UUID("9e9f8acd-e816-4839-8b14-e338d911a5ee"),
    UUID("94deb987-ce25-42bf-934c-d654fa816280"),
    UUID("7f8e5da0-0bed-4bc9-81f8-6b0ab8896fea"),
    UUID("2ccf8b3d-7cc7-4966-b542-b7b32514844b"),
    UUID("e5b41218-6dba-4b2e-9016-ce055819809c"),
    UUID("6224129d-0f69-4b2e-a17f-4c04e2d97a83"),
    UUID("0d700053-337d-4b67-bf23-e440f2128280"),
    UUID("5e173c7f-490d-4455-b66f-6a5b10d40608"),
    UUID("6f12840c-a2e5-4c6f-b3fc-3bb14d1e0248"),
    UUID("e32e3388-5ceb-4863-8afd-b8e00c16d484"),
    UUID("f476c05e-9af4-4092-860b-8cda126e2092"),
    UUID("2eb246f2-0a27-4bac-b6cc-1cce2f3b738f"),
]

# Remove manager IDs from user list to get members
member_ids = [uid for uid in all_user_ids if uid not in manager_ids]

def insert_teams():
    with Session(engine) as session:
        teams_created = 0
        for idx, member_id in enumerate(member_ids):
            # Assign 70% of users to the primary manager, others randomly
            if random.random() < 0.7:
                manager_id = '6716c12c-f5c2-4d1b-9b39-8ce38f80d666'
            else:
                # Ensure random manager is not the primary one every time
                alternative_managers = [m for m in manager_ids if m != '6716c12c-f5c2-4d1b-9b39-8ce38f80d666']
                manager_id = random.choice(alternative_managers) if alternative_managers else '6716c12c-f5c2-4d1b-9b39-8ce38f80d666'
            
            team = Team(
                manager_id=manager_id,
                member_id=member_id,
                created_at=datetime.utcnow(),
                updated_at=datetime.utcnow()
            )
            session.add(team)
            teams_created += 1
        session.commit()
        print(f"✅ Inserted {teams_created} team entries.")
    # with Session(engine) as session:
    #     for member_id in member_ids:
    #         manager_id = random.choice(manager_ids)
    #         team = Team(
    #             manager_id=manager_id,
    #             member_id=member_id,
    #             created_at=datetime.utcnow(),
    #             updated_at=datetime.utcnow()
    #         )
    #         session.add(team)
    #     session.commit()
    #     print(f"✅ Inserted {len(member_ids)} team entries.")

if __name__ == "__main__":
    insert_teams()
